const deleteDeptFormHandler = async (event) => {
    event.preventDefault();
    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
  
    const response = await fetch(`/api/departments/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({ name }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            alert("post Deleted successfully!!");
            document.location.replace('/api/departments/');
        } else {
            alert(response.statusText);
        }
}

document.querySelector('.delete-dept-btn').addEventListener('submit', deleteDeptFormHandler);
