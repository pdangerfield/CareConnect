const deleteEmpFormHandler = async (event) => {
    event.preventDefault();
    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
  
    const response = await fetch(`/api/employees/del/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log("Employee Deleted successfully");
            document.location.replace('/api/employees/');
        } else {
            alert(response.statusText);
        }
}

document.querySelector('#emp-del-btn').addEventListener('click', deleteEmpFormHandler);