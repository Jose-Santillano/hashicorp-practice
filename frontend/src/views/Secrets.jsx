import { useState, useEffect } from "react";
import { Modal, Button, Table, TextInput, Select, Label } from "flowbite-react";
import {
  FiDatabase,
  FiPlus,
  FiTrash,
  FiEdit3,
  FiSearch,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import axios from "axios";

const Secrets = () => {
  const [secrets, setSecrets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSecret, setCurrentSecret] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda
  const [formData, setFormData] = useState({
    db_host: "",
    db_port: "",
    db_name: "",
    db_user: "",
    db_password: "",
    db_sslmode: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // Obtener secretos del backend al cargar el componente
  useEffect(() => {
    fetchSecrets();
  }, []);

  const fetchSecrets = async () => {
    try {
      const response = await axios.get(`${API_URL}/get_config`); // Actualizado
      setSecrets([response.data]); // Objeto de respuesta actualizado
    } catch (error) {
      console.error("Error fetching secrets:", error);
    }
  };

  const handleOpenModal = (secret = null) => {
    setCurrentSecret(secret);
    setFormData(
      secret || {
        db_host: "",
        db_port: "",
        db_name: "",
        db_user: "",
        db_password: "",
        db_sslmode: "",
      }
    );
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentSecret(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      if (currentSecret) {
        // Actualizar un secreto existente
        await axios.post(`${API_URL}/store_config`, formData); // Actualizado
      } else {
        // Crear un nuevo secreto
        await axios.post(`${API_URL}/store_config`, formData); // Actualizado
      }
      fetchSecrets(); // Actualizar la lista de secretos
      handleCloseModal();
    } catch (error) {
      console.error("Error saving secret:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/secrets/${id}`);
      fetchSecrets(); // Actualizar la lista de secretos
    } catch (error) {
      console.error("Error deleting secret:", error);
    }
  };

  // Filtro de búsqueda
  const filteredSecrets = secrets.filter((secret) =>
    Object.values(secret).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen w-full p-8 bg-gray-50">
      <div className="min-h-screen w-full p-8 bg-gray-50">
        <div className="flex items-center gap-2 mb-8">
          <FiDatabase className="text-3xl text-gray-800" />
          <h1 className="text-3xl font-semibold text-gray-800">
            Secrets Management
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex gap-4 items-center">
          <TextInput
            icon={FiSearch}
            placeholder="Search by host, port, name, etc..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 focus:ring-gray-500 focus:border-gray-500"
          />
          <Button onClick={() => handleOpenModal()} color="dark">
            <div className="flex gap-1 items-center">
              <FiPlus className="text-xl" />
              <p>Add Secret</p>
            </div>
          </Button>
        </div>

        {/* Secrets Table */}
        <Table>
          <Table.Head>
            <Table.HeadCell>Host</Table.HeadCell>
            <Table.HeadCell>Port</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>User</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {filteredSecrets.length > 0 ? (
              filteredSecrets.map((secret, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{secret.db_host}</Table.Cell>
                  <Table.Cell>{secret.db_port}</Table.Cell>
                  <Table.Cell>{secret.db_name}</Table.Cell>
                  <Table.Cell>{secret.db_user}</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button
                        size="xs"
                        onClick={() => handleOpenModal(secret)}
                        color="dark"
                      >
                        <FiEdit3 />
                      </Button>
                      <Button
                        size="xs"
                        color="dark"
                        onClick={() => handleDelete(secret.db_name)}
                      >
                        <FiTrash />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="5" className="text-center">
                  No secrets found
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>

        {/* Modal for Add/Edit Secret */}
        <Modal show={isModalOpen} onClose={handleCloseModal}>
          <Modal.Header>
            {currentSecret ? "Edit Secret" : "Add Secret"}
          </Modal.Header>
          <Modal.Body>
            <form className="flex flex-col gap-2">
              <div>
                <Label htmlFor="db_host" value="Database Host" />
                <TextInput
                  id="db_host"
                  name="db_host"
                  placeholder="Database Host"
                  value={formData.db_host}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="db_port" value="Database Port" />
                <TextInput
                  id="db_port"
                  name="db_port"
                  placeholder="Database Port"
                  value={formData.db_port}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="db_name" value="Database Name" />
                <TextInput
                  id="db_name"
                  name="db_name"
                  placeholder="Database Name"
                  value={formData.db_name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="db_user" value="Database User" />
                <TextInput
                  id="db_user"
                  name="db_user"
                  placeholder="Database User"
                  value={formData.db_user}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="db_password" value="Database Password" />
                <div className="flex">
                  <TextInput
                    id="db_password"
                    name="db_password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Database Password"
                    value={formData.db_password}
                    onChange={handleChange}
                    className="pr-2 w-full"
                  />
                  <Button
                    color="dark"
                    className="flex items-center text-gray-100"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="db_sslmode" value="SSL Mode" />
                <Select
                  id="db_sslmode"
                  name="db_sslmode"
                  value={formData.db_sslmode}
                  onChange={handleChange}
                >
                  <option value="disable">Disable</option>
                  <option value="require">Require</option>
                  <option value="verify-ca">Verify CA</option>
                  <option value="verify-full">Verify Full</option>
                </Select>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleSave} color="dark">
              {currentSecret ? "Save Changes" : "Add Secret"}
            </Button>
            <Button color="gray" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Secrets;
