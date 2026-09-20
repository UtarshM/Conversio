import React, { createContext, useContext, useState, useEffect } from "react";
import type { Partner } from "../types/partner.types";
import { partnerApi } from "../services/partnerApi";

interface PartnerAuthContextType {
  partner: Partner | null;
  isLoading: boolean;
  refreshPartner: () => Promise<void>;
  updatePartnerState: (updates: Partial<Partner>) => void;
}

const PartnerAuthContext = createContext<PartnerAuthContextType | undefined>(undefined);

export const PartnerAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [partner, setPartner] = useState<Partner | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshPartner = async () => {
    try {
      const data = await partnerApi.getPartnerProfile();
      setPartner(data);
    } catch (e) {
      console.error("Failed to load partner profile", e);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePartnerState = (updates: Partial<Partner>) => {
    setPartner((prev) => (prev ? { ...prev, ...updates } : null));
  };

  useEffect(() => {
    refreshPartner();
  }, []);

  return (
    <PartnerAuthContext.Provider value={{ partner, isLoading, refreshPartner, updatePartnerState }}>
      {children}
    </PartnerAuthContext.Provider>
  );
};

export const usePartnerAuth = () => {
  const ctx = useContext(PartnerAuthContext);
  if (!ctx) throw new Error("usePartnerAuth must be used within PartnerAuthProvider");
  return ctx;
};
