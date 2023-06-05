const newDeptFormHandler = async (event) => {
    event.preventDefault();

    const deptName = document.querySelector('input[name="dept-title"]').value.trim();
   
    //alert contents
    if (deptName) {
        const response = await fetch(`/api/departments`, {
            method: 'POST',
            body: JSON.stringify({ name }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.reload('/api/departments');
        } else {
            alert(response.statusText);
        }
    }
    else {
        alert("please enter name for the department");
    }
}

document.querySelector('.new-dept-form').addEventListener('submit', newDeptFormHandler);
  