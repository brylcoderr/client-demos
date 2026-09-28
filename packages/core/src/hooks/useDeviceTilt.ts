"use client";

/**
 * useDeviceTilt
 *
 * Returns `{ beta, gamma }` from the DeviceOrientation API.
 * On iOS 13+ requests permission via a user-gesture callback.
 *
 * @example
 * ```tsx
 * const { beta, gamma } = useDeviceTilt();
 * // Use for mobile parallax: transform: rotateX(${beta}deg) rotateY(${gamma}deg)
 * ```
 */

import { useState, useEffect, useCallback } from "react";

interface Tilt {
  beta: number;
  gamma: number;
}

export function useDeviceTilt() {
  const [tilt, setTilt] = useState<Tilt>({ beta: 0, gamma: 0 });
  const [permissionGranted, setPermissionGranted] = useState(false);

  const requestPermission = useCallback(async () => {
    // iOS 13+ requires explicit permission request from a user gesture
    const dme = DeviceMotionEvent as any;
    if (typeof dme?.requestPermission === "function") {
      try {
        const response = await dme.requestPermission();
        setPermissionGranted(response === "granted");
      } catch {
        setPermissionGranted(false);
      }
    } else {
      // Non-iOS or older iOS — permission is implicit
      setPermissionGranted(true);
    }
  }, []);

  useEffect(() => {
    // Attempt permission immediately (works on non-iOS).
    // On iOS this won't fire until requestPermission() is called from a click.
    requestPermission();
  }, [requestPermission]);

  useEffect(() => {
    if (!permissionGranted) return;

    const handler = (e: DeviceOrientationEvent) => {
      setTilt({ beta: e.beta ?? 0, gamma: e.gamma ?? 0 });
    };
    window.addEventListener("deviceorientation", handler);
    return () => window.removeEventListener("deviceorientation", handler);
  }, [permissionGranted]);

  return { ...tilt, requestPermission };
}
