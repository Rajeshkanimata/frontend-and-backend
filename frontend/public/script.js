const apiUrl = "/api/users";
const form = document.getElementById("userForm");
const list = document.getElementById("userList");

async function fetchUsers() {
  const res = await fetch(apiUrl);
  const users = await res.json();
  list.innerHTML = "";
  users.forEach(u => {
    const li = document.createElement("li");
    li.textContent = `${u.name} (${u.email})`;
    list.appendChild(li);
  });
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  form.reset();
  fetchUsers();
});

fetchUsers();
