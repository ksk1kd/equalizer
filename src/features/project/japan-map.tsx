"use client";

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
const MIN_OPACITY = 0.3;

const JapanMap = ({
  data,
  segments,
  hue,
}: { data: Pref[]; segments: number[]; hue: number }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const amountArray = data.map((item) => item.amount);
  const min = Math.min(...amountArray);
  const max = Math.max(...amountArray);
  const completedSegments = React.useMemo(
    () => [min - 1, ...segments.sort(), max],
    [min, max, segments],
  );

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
      .attr("fill", `oklch(${LIGHTNESS} ${CHROMA} ${hue})`)
      .attr("fill-opacity", (item) => {
        const targets = data.filter((e) => e.name === item.properties.name);
        if (targets.length === 0) return 0;

        const amount = targets[0].amount;
        for (let i = 1; i < completedSegments.length; i++) {
          if (
            amount > completedSegments[i - 1] &&
            amount <= completedSegments[i]
          ) {
            const opacity =
              1.0 -
              ((completedSegments.length - 1 - i) * (1.0 - MIN_OPACITY)) /
                (completedSegments.length - 2);
            return opacity;
          }
        }

        return 1;
      });

    return () => {
      d3.select(mapContainer).selectAll("*").remove();
    };
  }, [data, completedSegments, hue]);

  return <div ref={mapContainerRef} className="w-[800px] h-[800px]" />;
};

export default memo(JapanMap);
