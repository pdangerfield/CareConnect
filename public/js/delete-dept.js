const deleteDeptFormHandler = async (event) => {
    event.preventDefault();
    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
  
    const response = await fetch(`/api/departments/del/${id}`, {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            alert("post Deleted successfully!!");
            document.location.replace('/api/departments/');
        } else {
            alert(response.statusText);
        }
}

document.querySelector('#dept-del-btn').addEventListener('click', deleteDeptFormHandler);
