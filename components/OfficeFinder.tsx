'use client';

import { useState } from "react";
import { offices, SASSAOffice } from "../lib/data/offices";
import { MapPin, Phone, Clock, Accessibility, Search } from "lucide-react";

export default function OfficeFinder() {
  const [selectedProvince, setSelectedProvince] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOffices = offices.filter((off) => {
    const matchesProvince = selectedProvince === "all" || off.province === selectedProvince;
    const matchesSearch =
      off.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProvince && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Controls Banner */}
      <div className="bg-surface border border-border rounded-xl p-5  flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex-1 w-full relative">
          <Search className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by city or office name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-surface-container rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-dark text-sm transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="text-xs font-bold text-muted-foreground font-mono uppercase whitespace-nowrap">Province:</label>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="w-full md:w-auto border border-surface-container rounded-xl px-3 py-2 bg-canvas text-xs font-semibold"
          >
            <option value="all">All Provinces</option>
            <option value="gauteng">Gauteng</option>
            <option value="western-cape">Western Cape</option>
            <option value="kzn">KwaZulu-Natal</option>
            <option value="limpopo">Limpopo</option>
            <option value="eastern-cape">Eastern Cape</option>
          </select>
        </div>
      </div>

      {/* Offices Grid */}
      {filteredOffices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffices.map((off) => (
            <div
              key={off.id}
              className="bg-surface border border-border rounded-xl p-5 transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-accent-light text-accent-dark border border-accent-light/40 text-xs font-mono font-bold px-2 py-0.5 rounded uppercase">
                    {off.province}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground uppercase">{off.city}</span>
                </div>

                <h3 className="font-extrabold text-sm text-ink leading-tight">
                  {off.name}
                </h3>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-accent-dark mt-0.5 flex-shrink-0" />
                    <span>{off.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-accent-dark flex-shrink-0" />
                    <span>{off.phone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span>{off.operatingHours}</span>
                  </div>
                </div>
              </div>

              {/* Extra Details */}
              <div className="pt-3.5 border-t border-surface space-y-3">
                {/* Services */}
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Services:</p>
                  <div className="flex flex-wrap gap-1">
                    {off.servicesOffered.map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs bg-canvas border border-border text-muted-foreground px-1.5 py-0.5 rounded"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Landmarks & Accessibility */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs text-muted-foreground">
                  <div className="space-y-0.5">
                    <p className="font-bold text-muted-foreground uppercase font-mono">Landmark</p>
                    <p className="truncate" title={off.nearbyLandmarks}>{off.nearbyLandmarks}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-bold text-muted-foreground uppercase font-mono">Access</p>
                    <div className="flex items-center gap-1">
                      <Accessibility className="w-3.5 h-3.5 text-accent-dark" />
                      <span className="truncate" title={off.accessibilityNotes}>{off.accessibilityNotes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center text-muted-foreground bg-surface border border-border rounded-xl">
          <MapPin className="w-8 h-8 text-outline-variant mx-auto mb-2" />
          <p className="font-bold text-sm">No SASSA offices found</p>
          <p className="text-xs mt-0.5">Adjust your filters or try another keywords.</p>
        </div>
      )}
    </div>
  );
}
