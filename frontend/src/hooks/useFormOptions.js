import { useState, useEffect } from 'react';
import klinikApi from '../services/api/klinikApi';
import kelasRuanganApi from '../services/api/kelasRuanganApi';

export default function useFormOptions(isOpen) {
  const [klinikList, setKlinikList] = useState([]);
  const [kelasList, setKelasList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchOptions = async () => {
      setIsLoading(true);
      try {
        const [klinikRes, kelasRes] = await Promise.all([
          klinikApi.getAll(),
          kelasRuanganApi.getAll(),
        ]);
        if (klinikRes.success) setKlinikList(klinikRes.data || []);
        if (kelasRes.success) setKelasList(kelasRes.data || []);
      } catch (err) {
        console.error('Failed to load options:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOptions();
  }, [isOpen]);

  return { klinikList, kelasList, isLoading };
}