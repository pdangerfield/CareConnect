const newDeptFormHandler = async (event) => {
    event.preventDefault();

    const deptName = document.querySelector('input[name="dept-name"]').value.trim();
   console.log("name: " + deptName);
    //alert contents
    if (deptName) {
        const response = await fetch(`/api/departments/add`, {
            method: 'POST',
            body: JSON.stringify({ deptName }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/api/departments');
            window.alert("Department Added!");
        } else {
            alert(response.statusText);
        }
    }
    else {
        alert("please enter name for the department");
    }
}

document.querySelector('#dept-add-btn').addEventListener('click', newDeptFormHandler);
  