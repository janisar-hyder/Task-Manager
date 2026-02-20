# API Documentation

Base URL: `http://localhost:5000`

## Endpoints

### 1. Create Task
- **URL:** `/api/tasks`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`

**Request Body**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, and bread",
  "status": "pending"
}
```
*Note: `description` and `status` are optional. `title` must be <= 100 characters.*

**Success Response (201 Created)**
```json
{
  "id": "e456b3fa-9c12-4f67-81ab-2b9a7c364811",
  "title": "Buy groceries",
  "description": "Milk, eggs, and bread",
  "status": "pending",
  "createdAt": "2023-11-15T10:00:00.000Z"
}
```

**Error Responses**
- **400 Bad Request** (Validation failure)
```json
{
  "error": "Title is required and must be a string up to 100 characters"
}
```

---

### 2. Fetch All Tasks
- **URL:** `/api/tasks`
- **Method:** `GET`
- **Optional Query Params:** `?status=pending|in-progress|completed`

**Filtering Example**
`GET /api/tasks?status=in-progress`

**Success Response (200 OK)**
```json
[
  {
    "id": "e456b3fa-9c12-4f67-81ab-2b9a7c364811",
    "title": "Buy groceries",
    "description": "Milk, eggs, and bread",
    "status": "in-progress",
    "createdAt": "2023-11-15T10:00:00.000Z"
  }
]
```

**Error Responses**
- **400 Bad Request** (Invalid filter)
```json
{
  "error": "Invalid status filter provided"
}
```

---

### 3. Update Task
- **URL:** `/api/tasks/:id`
- **Method:** `PATCH`
- **Headers:** `Content-Type: application/json`

**Request Body (Any combination of fields)**
```json
{
  "status": "completed",
  "title": "Buy groceries and snacks"
}
```

**Success Response (200 OK)**
```json
{
  "id": "e456b3fa-9c12-4f67-81ab-2b9a7c364811",
  "title": "Buy groceries and snacks",
  "description": "Milk, eggs, and bread",
  "status": "completed",
  "createdAt": "2023-11-15T10:00:00.000Z"
}
```

**Error Responses**
- **404 Not Found**
```json
{
  "error": "Task not found"
}
```
- **400 Bad Request**
```json
{
  "error": "Invalid status enum"
}
```

---

### 4. Delete Task
- **URL:** `/api/tasks/:id`
- **Method:** `DELETE`

**Success Response (200 OK)**
```json
{
  "message": "Task deleted successfully"
}
```

**Error Responses**
- **404 Not Found**
```json
{
  "error": "Task not found"
}
```
