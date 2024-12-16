import { useState } from "react";
import { Modal, Button, Table, TextInput, Select, Label } from "flowbite-react";
import { FiHardDrive, FiPlus, FiTrash, FiEdit3, FiSearch } from "react-icons/fi";

const Workers = () => {
  const [workers, setWorkers] = useState([]); // Estado para manejar los trabajadores
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWorker, setCurrentWorker] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
  const [formData, setFormData] = useState({
    worker_id: "",
    worker_name: "",
    worker_role: "",
  });

  // Handlers
  const handleOpenModal = (worker = null) => {
    setCurrentWorker(worker);
    setFormData(
      worker || {
        worker_id: "",
        worker_name: "",
        worker_role: "",
      }
    );
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentWorker(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (currentWorker) {
      // Editar trabajador existente
      setWorkers(
        workers.map((w) =>
          w.worker_id === currentWorker.worker_id ? formData : w
        )
      );
    } else {
      // Agregar nuevo trabajador
      setWorkers([...workers, formData]);
    }
    handleCloseModal();
  };

  const handleDelete = (worker_id) => {
    setWorkers(workers.filter((w) => w.worker_id !== worker_id));
  };

  // Filtro de búsqueda
  const filteredWorkers = workers.filter((worker) =>
    Object.values(worker).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen w-full p-8 bg-gray-50">
      <div className="flex items-center gap-2 mb-8">
        <FiHardDrive className="text-3xl text-gray-800" />
        <h1 className="text-3xl font-semibold text-gray-800">Worker Management</h1>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6 flex gap-4 items-center">
        <TextInput
          icon={FiSearch}
          placeholder="Search by ID, Name, etc..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 focus:ring-gray-500 focus:border-gray-500"
        />
        <Button onClick={() => handleOpenModal()} color="dark">
          <div className="flex gap-1 items-center">
            <FiPlus className="text-xl" />
            <p>Add Worker</p>
          </div>
        </Button>
      </div>

      {/* Tabla de trabajadores */}
      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map((worker, index) => (
              <Table.Row key={index}>
                <Table.Cell>{worker.worker_id}</Table.Cell>
                <Table.Cell>{worker.worker_name}</Table.Cell>
                <Table.Cell>{worker.worker_role}</Table.Cell>
                <Table.Cell>
                  <div className="flex gap-2">
                    <Button
                      size="xs"
                      onClick={() => handleOpenModal(worker)}
                      color="dark"
                    >
                      <FiEdit3 />
                    </Button>
                    <Button
                      size="xs"
                      color="dark"
                      onClick={() => handleDelete(worker.worker_id)}
                    >
                      <FiTrash />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan="4" className="text-center">
                No workers found
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      {/* Modal para agregar/editar trabajador */}
      <Modal show={isModalOpen} onClose={handleCloseModal}>
        <Modal.Header>
          {currentWorker ? "Edit Worker" : "Add Worker"}
        </Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-2">
            <div>
              <Label htmlFor="worker_id" value="Worker ID" />
              <TextInput
                id="worker_id"
                name="worker_id"
                placeholder="Worker ID"
                value={formData.worker_id}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="worker_name" value="Worker Name" />
              <TextInput
                id="worker_name"
                name="worker_name"
                placeholder="Worker Name"
                value={formData.worker_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="worker_role" value="Role" />
              <Select
                id="worker_role"
                name="worker_role"
                value={formData.worker_role}
                onChange={handleChange}
              >
                <option value="admin">Admin</option>
                <option value="database">Database</option>
                <option value="authtentication">Authentication</option>
              </Select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSave} color="dark">
            {currentWorker ? "Save Changes" : "Add Worker"}
          </Button>
          <Button color="gray" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Workers;
