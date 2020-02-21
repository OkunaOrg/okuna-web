const UsernameMatcher = RegExp('(?:[^A-Za-u0-9]|^)(@[A-Za-z0-9](([A-Za-z0-9]|[._-](?![._-])){0,28}[A-Za-z0-9])?)(?=\\b|$)');

export default UsernameMatcher;