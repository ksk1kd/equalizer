"use client";

import { useCurrentProjectContext } from "@/contexts/currentProject";
import geoJson from "@/features/project/data/japan.json";
import * as d3 from "d3";
import React, { useEffect, memo, useRef } from "react";

export type Pref = {
  name: string;
  amount: number;
};

const WIDTH = 800;
const HEIGHT = 800;
const CENTER_POS = [137.0, 38.2] as [number, number];
const SCALE = 1500;
const LIGHTNESS = 0.75;
const CHROMA = 0.18;

const JapanMap = () => {
  const { currentProject } = useCurrentProjectContext();
  if (!currentProject) return;

  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!geoJson || !geoJson.features) return;

    const mapContainer = mapContainerRef.current;
    if (!mapContainer) return;

    const projection = d3
      .geoMercator()
      .center(CENTER_POS)
      .translate([WIDTH / 2, HEIGHT / 2])
      .scale(SCALE);

    const path = d3.geoPath().projection(projection);

    const svg = d3
      .select(mapContainer)
      .append("svg")
      .attr("width", mapContainer.offsetWidth)
      .attr("height", mapContainer.offsetHeight);

    svg
      .selectAll("path")
      .data(geoJson.features)
      .enter()
      .append("path")
      .attr("d", (d) => path(d as d3.GeoPermissibleObjects))
      .attr("stroke", "#666")
      .attr("stroke-width", 1)
      .attr("fill", `oklch(${LIGHTNESS} ${CHROMA} ${currentProject.color.hue})`)
      .attr("fill-opacity", (item) => {
        const targets = currentProject.data.source.filter(
          (e) => e.name === item.properties.name,
        );
        if (targets.length === 0) return 0;

        const amount = targets[0].amount;

        for (let i = 0; i < currentProject.data.segments.length; i++) {
          const min = currentProject.data.segments[i].min ?? amount;
          const max = currentProject.data.segments[i].max ?? amount;
          if (amount >= min && amount <= max) {
            return currentProject.data.segments[i].opacity;
          }
        }

        return 1;
      });

    return () => {
      d3.select(mapContainer).selectAll("*").remove();
    };
  }, [currentProject]);

  return <div ref={mapContainerRef} className="w-[800px] h-[800px]" />;
};

export default memo(JapanMap);
