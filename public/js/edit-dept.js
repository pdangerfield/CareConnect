const editDeptFormHandler = async (event) => {
    event.preventDefault();

    const deptName = document.querySelector('input[name="dept-name"]').value.trim();
    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

    if (deptName) {
        const response = await fetch(`/api/departments/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ deptName }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/api/departments/');
        } else {
            alert(response.statusText);
        }
    }
    else {
        alert("please enter name for the department");
    }
}

document.querySelector('#dept-edit-btn').addEventListener('submit', editDeptFormHandler);