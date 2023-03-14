let userform = document.getElementById("user-form");

const retrieveEntries = () => {
    let entries=localStorage.getItem("user-entries");
    if (entries) {
        entries=JSON.parse(entries);
    }else{
        entries=[];
    }
    return entries;
}
let userEntry=retrieveEntries();

const displayEntries = () => {
  const entries = retrieveEntries();
  const tableEntries = entries
    .map((entry) => {
      const nameCell = `<td class='border px-3 py-2'>${entry.name}</td>`;
      const emailCell = `<td class='border px-3 py-2'>${entry.email}</td>`;
      const passwordCell = `<td class='border px-3 py-2'>${entry.password}</td>`;
      const dobCell = `<td class='border px-3 py-2'>${entry.dob}</td>`;
      const acceptTermsCell = `<td class='border px-3 py-2'>${entry.acceptTermsAndConditions}</td>`;
      const row = `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
      return row;
    })
    .join("\n");

  const table = `<table>
    <tr>
      <th class='border px-3 py-2'>Name</th>
      <th class='border px-3 py-2'>Email</th>
      <th class='border px-3 py-2'>Password</th>
      <th class='border px-3 py-2'>DOB</th>
      <th class='border px-3 py-2'>Accepted Terms?</th>
    </tr>
    ${tableEntries}
  </table>`;

  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};


const saveuserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTermsAndConditions = document.getElementById("acceptTerms").checked;

  const dobDate = new Date(dob);
  const age = (Date.now() - dobDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  if (age < 18 || age > 55) {
    const errorField = document.querySelector(".error");
    errorField.textContent = "Your Age should be between 18 and 55 years old.";
    errorField.style.display = "block";
    return;
  }

  const entry={
    name,
    email,
    password,
    dob,
    acceptTermsAndConditions
  };
  userEntry.push(entry);

  localStorage.setItem("user-entries",JSON.stringify(userEntry));
  displayEntries().join("\n");
};
userform.addEventListener("submit", saveuserForm);
displayEntries();

const form = document.getElementById("user-form");
		const dobField = document.getElementById("dob");
		const errorField = document.createElement("div");
		errorField.className = "error";
		errorField.style.display = "none";
		form.insertBefore(errorField, dobField.nextSibling);
		
		form.addEventListener("submit", function(event) {
			const dob = new Date(dobField.value);
			const age = (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
			if (age < 18 || age > 55) {
				event.preventDefault();
				errorField.textContent = "You Age should be between 18 and 55 years old.";
				errorField.style.display = "block";
			} else {
				errorField.style.display = "none";
			}
		});
