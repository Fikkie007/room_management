import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import kategoriRuanganApi from '../services/api/kategoriRuanganApi';

const initialFormData = {
  id_klinik: '',
  id_kelas_ruangan: '',
  jenis_kelamin: '',
  usia: '',
  penyakit: '',
  nama_ruangan: '',
  harga_ruangan: '',
  fasilitas_ruangan: [],
  is_active: true,
};

export default function useKategoriRuangan() {
  const navigate = useNavigate();
  const [user] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, perPage: 10, total: 0, totalPages: 0 });
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleAuthError = useCallback((err) => {
    if (err.response?.status === 401 || err.message?.includes('401')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
      return true;
    }
    return false;
  }, [navigate]);

  const fetchData = useCallback(async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await kategoriRuanganApi.getAll({ page, perPage: pagination.perPage, search, is_active: statusFilter });
      if (result.success) {
        setData(result.data.data);
        setPagination(result.data.pagination);
      }
    } catch (err) {
      if (!handleAuthError(err)) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [pagination.perPage, search, statusFilter, handleAuthError]);

  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await kategoriRuanganApi.getAll({ page: 1, perPage: pagination.perPage, search, is_active: statusFilter });
        if (result.success) {
          setData(result.data.data);
          setPagination(result.data.pagination);
        }
      } catch (err) {
        if (!handleAuthError(err)) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [search, statusFilter, pagination.perPage, handleAuthError]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }, [navigate]);

  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchData(newPage);
    }
  }, [pagination.totalPages, fetchData]);

  const openAddModal = useCallback(() => {
    setModalMode('add');
    setFormData(initialFormData);
    setFormErrors({});
    setShowModal(true);
  }, []);

  const openEditModal = useCallback((item) => {
    setModalMode('edit');
    setSelectedItem(item);
    setFormData({
      id_klinik: item.id_klinik,
      id_kelas_ruangan: item.id_kelas_ruangan,
      jenis_kelamin: item.jenis_kelamin,
      usia: item.usia,
      penyakit: item.penyakit,
      nama_ruangan: item.nama_ruangan,
      harga_ruangan: item.harga_ruangan,
      fasilitas_ruangan: item.fasilitas_ruangan || [],
      is_active: item.is_active ?? true,
    });
    setFormErrors({});
    setShowModal(true);
  }, []);

  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [formErrors]);

  const openDeleteDialog = useCallback((item) => {
    setDeleteTarget(item);
    setShowDeleteDialog(true);
  }, []);

  return {
    user,
    data,
    pagination,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    isLoading,
    error,
    showModal,
    setShowModal,
    modalMode,
    selectedItem,
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    isSubmitting,
    setIsSubmitting,
    showDeleteDialog,
    setShowDeleteDialog,
    deleteTarget,
    setDeleteTarget,
    handleAuthError,
    fetchData,
    handleLogout,
    handlePageChange,
    openAddModal,
    openEditModal,
    handleFormChange,
    openDeleteDialog,
  };
}