"use client";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export type LocationMapProps = {
  position: [number, number];
  zoom?: number;
  popupTitle?: string;
  popupAddress?: string;
};

const goldPinIcon = L.divIcon({
  className: "tmp-gold-pin",
  html: `
    <svg viewBox="0 0 36 46" width="36" height="46" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="tmp-pin-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.5"/>
        </filter>
      </defs>
      <path
        filter="url(#tmp-pin-shadow)"
        d="M18 0 C8 0 0 8 0 18 C0 32 18 46 18 46 C18 46 36 32 36 18 C36 8 28 0 18 0 Z"
        fill="#d4af64"
        stroke="#0a0807"
        stroke-width="1.5"
      />
      <circle cx="18" cy="18" r="6" fill="#0a0807"/>
      <circle cx="18" cy="18" r="2.5" fill="#d4af64"/>
    </svg>
  `,
  iconSize: [36, 46],
  iconAnchor: [18, 46],
  popupAnchor: [0, -42],
});

export default function LocationMapInner({
  position,
  zoom = 16,
  popupTitle,
  popupAddress,
}: LocationMapProps) {
  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      zoomControl={true}
      attributionControl={true}
      className="absolute inset-0 w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={20}
      />
      <Marker position={position} icon={goldPinIcon}>
        {(popupTitle || popupAddress) && (
          <Popup>
            <div className="tmp-popup">
              {popupTitle && <div className="tmp-popup-title">{popupTitle}</div>}
              {popupAddress && <div className="tmp-popup-addr">{popupAddress}</div>}
            </div>
          </Popup>
        )}
      </Marker>
    </MapContainer>
  );
}
