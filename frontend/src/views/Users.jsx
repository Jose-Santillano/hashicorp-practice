import { useState } from "react";
import { Modal, Button, Table, TextInput, Select, Label } from "flowbite-react";

// Icons
import { FiUser, FiPlus, FiGrid, FiList, FiSearch } from "react-icons/fi";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [viewMode, setViewMode] = useState("table"); // "table" or "cards"
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    branch: "",
    role: "User",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar usuarios según el término de búsqueda
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers
  const handleOpenModal = (user = null) => {
    setCurrentUser(user);
    setFormData(user || { username: "", email: "", branch: "", role: "User" });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (currentUser) {
      // Edit user
      setUsers(
        users.map((u) => (u.id === currentUser.id ? { ...u, ...formData } : u))
      );
    } else {
      // Add new user
      const newUser = { ...formData, id: Date.now() };
      setUsers([...users, newUser]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "table" ? "cards" : "table");
  };

  return (
    <div className="min-h-screen w-full p-8 bg-gray-50">
      <div className="flex items-center gap-2 mb-8">
        <FiUser className="text-3xl text-gray-800" />
        <h1 className="text-3xl font-semibold text-gray-800">
          User Management
        </h1>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-6">
        <TextInput
          icon={FiSearch}
          placeholder="Search by username, email, branch, or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 focus:ring-gray-500 focus:border-gray-500"
        />
        <Button onClick={() => handleOpenModal()} color="dark">
          <div className="flex gap-1 items-center">
            <FiPlus className="text-xl" />
            <p>Add User</p>
          </div>
        </Button>
        <Button onClick={toggleViewMode} color="dark">
          <div className="flex gap-1">
            {viewMode === "table" ? (
              <FiList className="text-xl" />
            ) : (
              <FiGrid className="text-xl" />
            )}
            <p>Toggle View</p>
          </div>
        </Button>
      </div>

      {/* Users View */}
      {viewMode === "table" ? (
        <Table>
          <Table.Head>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Branch</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.branch}</Table.Cell>
                  <Table.Cell>{user.role}</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button
                        size="xs"
                        onClick={() => handleOpenModal(user)}
                        color="dark"
                      >
                        Edit
                      </Button>
                      <Button
                        size="xs"
                        color="dark"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="5" className="text-center">
                  No users found
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} className="bg-gray border-2 border-dashed p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800">
                  {user.username}
                </h2>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-600">{user.branch}</p>
                <p className="text-sm text-gray-600">{user.role}</p>
                <div className="flex gap-2 mt-4">
                  <Button
                    size="xs"
                    onClick={() => handleOpenModal(user)}
                    color="dark"
                  >
                    Edit
                  </Button>
                  <Button
                    size="xs"
                    color="dark"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className=" text-gray-600">No users found</div>
          )}
        </div>
      )}

      {/* Modal for Add/Edit User */}
      <Modal show={isModalOpen} onClose={handleCloseModal}>
        <Modal.Header>{currentUser ? "Edit User" : "Add User"}</Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-4">
            <div>
              <Label htmlFor="username" value="Username" />
              <TextInput
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="branch" value="Branch" />
              <TextInput
                id="branch"
                name="branch"
                placeholder="Branch"
                value={formData.branch}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="role" value="Role" />
              <Select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
              </Select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSave} color="dark">
            {currentUser ? "Save Changes" : "Add User"}
          </Button>
          <Button color="gray" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
