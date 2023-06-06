
const newEmpFormHandler = async (event) => {
    console.log("test");
    event.preventDefault();

    const first_name = document.querySelector('input[name="first_name"]').value.trim();
    const last_name = document.querySelector('input[name="last_name"]').value.trim();
    const title = document.querySelector('select[name="title"]').value.trim();
    console.log("first_name:" + first_name);
    console.log("last_name: " + last_name);
    console.log("title: " + title);
    //alert contents
    if (first_name && last_name && title) {
        const response = await fetch(`/api/employees/add`, {
            method: 'POST',
            body: JSON.stringify({ first_name, last_name, title }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/api/employees');
        } else {
            alert(response.statusText);
        }
    }
    else {
        alert("please enter name and role for the employee");
    }
}

document.querySelector('#emp-add-btn').addEventListener('click', newEmpFormHandler);

