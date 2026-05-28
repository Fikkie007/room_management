import Header from '../components/CategoryRoom/Header';
import Toolbar from '../components/CategoryRoom/Toolbar';
import DataTable from '../components/CategoryRoom/DataTable';
import MobileList from '../components/CategoryRoom/MobileList';
import Pagination from '../components/CategoryRoom/Pagination';
import RoomForm from '../components/CategoryRoom/RoomForm';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';

import useKategoriRuangan from '../hooks/useKategoriRuangan';
import kategoriRuanganApi from '../services/api/kategoriRuanganApi';
import Sidebar from '../components/CategoryRoom/Sidebar';
import Footer from '../components/CategoryRoom/Footer';

function CategoryRoomList() {
  const {
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
    formErrors,
    setFormErrors,
    isSubmitting,
    setIsSubmitting,
    showDeleteDialog,
    setShowDeleteDialog,
    deleteTarget,
    handleAuthError,
    fetchData,
    handleLogout,
    handlePageChange,
    openAddModal,
    openEditModal,
    handleFormChange,
    openDeleteDialog,
  } = useKategoriRuangan();

  const handleFormSubmit = async (data, validationErrors) => {
    if (validationErrors) {
      setFormErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      if (modalMode === 'add') {
        await kategoriRuanganApi.create(data);
      } else {
        await kategoriRuanganApi.update(selectedItem.id, data);
      }

      setShowModal(false);
      fetchData(pagination.page);
    } catch (err) {
      if (!handleAuthError(err)) {
        setFormErrors({ general: err.message });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    setIsSubmitting(true);

    try {
      await kategoriRuanganApi.delete(deleteTarget.id);
      setShowDeleteDialog(false);
      fetchData(pagination.page);
    } catch (err) {
      if (!handleAuthError(err)) {
        console.error(err.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">

      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <Header user={user} onLogout={handleLogout} />

        {/* Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">

          <Toolbar
            search={search}
            onSearchChange={(e) => setSearch(e.target.value)}
            statusFilter={statusFilter}
            onStatusFilterChange={(e) => setStatusFilter(e.target.value)}
            isAdmin={user?.is_admin}
            onAddClick={openAddModal}
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* <DataTable
              data={data}
              isLoading={isLoading}
              isAdmin={user?.is_admin}
              onEdit={openEditModal}
              onDelete={openDeleteDialog}
            /> */}

            <MobileList
              data={data}
              isLoading={isLoading}
              isAdmin={user?.is_admin}
              onEdit={openEditModal}
              onDelete={openDeleteDialog}
            />
          </div>

          {!isLoading && data.length > 0 && (
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          )}
        </main>

        <Footer />
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalMode === 'add' ? 'Tambah Ruangan' : 'Edit Ruangan'}
      >
        <RoomForm
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          mode={modalMode}
          formData={formData}
          formErrors={formErrors}
          isSubmitting={isSubmitting}
          onFormChange={handleFormChange}
          onSubmit={handleFormSubmit}
        />
      </Modal>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Hapus Ruangan"
        message={`Apakah Anda yakin ingin menghapus ruangan "${deleteTarget?.nama_ruangan}"?`}
        confirmText="Hapus"
        isLoading={isSubmitting}
      />
    </div>
  );
}

export default CategoryRoomList;