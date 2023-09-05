const resp = fetch('https://reqres.in/api/users');




const getTabla = () => {
    
    resp.then(response => response.json())
    .then((json)=>{
        let lista = json.data;
        console.log("esta es la lista",lista);
        if(lista){
            console.log("200");
            let tabla = document.getElementById('tablebody');
            for(let i =0; i<lista.length; i++) {
                tabla.innerHTML +=
                    "<tr>"+
                    "<td>" +lista[i].email+"</td>"+
                    "<td>"+lista[i].first_name +"</td>"+
                    "<td>"+lista[i].last_name +"</td>"+
                    "<td><button type='button' class='btn btn-info center' onclick='findById(" + lista[i].id + ")' data-bs-toggle='modal' data-bs-target='#detalles'>Detalles</button></td>"+
                    "<td><button type='button' class='btn btn-danger center' onclick='eliminarRegistro(" + lista[i].id + ")'>Eliminar</button></td>"+
                    "<td><button type='button' class='btn btn-warning center' data-bs-toggle='modal' data-bs-target='#update'>Actualizar</button></td>"
                    "</tr>";
            }
        }else{
            console.log("404");
        }
    });
}


const findById = (id) =>{
    fetch('https://reqres.in/api/users/'+id)
    .then(response => response.json())
    .then(json => {
        console.log(json.data)
        document.getElementById("name").innerHTML = "Nombre: "+ json.data.first_name;
        document.getElementById("last").innerHTML = "Apellido: "+json.data.last_name;
        document.getElementById("email").innerHTML = "Correo: "+json.data.email
        document.getElementById("avatar").src = json.data.avatar
    })
}


const eliminarRegistro = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro de eliminar este registro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `https://reqres.in/api/users?id=${id}`;
        fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.ok) {
            swalWithBootstrapButtons.fire(
              'Eliminado',
              'El registro ha sido eliminado correctamente',
              'success'
            );
            console.log("204");
            getTabla()
          } else {
            swalWithBootstrapButtons.fire(
              'Error',
              'Ha ocurrido un error al eliminar el registro',
              'error'
            );

            console.log("500");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          swalWithBootstrapButtons.fire(
            'Error',
            'Ha ocurrido un error al eliminar el registro',
            'error'
          );
        });
      }else{
        swalWithBootstrapButtons.fire(
            'Acción cancelada',
            'No se ha realizado el registro',
            'error'
        )
      }
    });
  };

  function registrar() {
    
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    const name = document.getElementById('nameR').value;
    const trabajo = document.getElementById('trabajoR').value;
    
    if(name == ''){
        Swal.fire({
            title: "Completa el campo",
            confirmButtonText: "Aceptar",
            icon: "error",
        })
    }else if(trabajo == ''){
        Swal.fire({
            title: "Completa el campo ",
            confirmButtonText: "Aceptar",
            icon: "error",
        })
    }else{
        swalWithBootstrapButtons.fire({
            title: 'Estás seguro de realizar el registro?',
            text: "Te sugerimos que revises la información antes de registrar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result)=>{
            if(result.isConfirmed){
                const data = { Name: name, Trabajo: trabajo};
                console.log(data)
                fetch(resp, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((response) => {
                        console.log("Éxito:", response);
                        
                        swalWithBootstrapButtons.fire(
                            'Registro exitoso',
                            'Se ha realizado el registro exitosamente',
                            'success'
                        )                       
                        getTabla();
                        
                    })
        .catch((error) => console.error("Error:", error));
            }else{
                swalWithBootstrapButtons.fire(
                    'Acción cancelada',
                    'No se ha realizado el registro',
                    'error'
                )
            }
        })
    }
    
}


function modificar() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
  
    // Obtiene el valor del ID después de declarar el elemento con el ID "id_update"
    var id = document.getElementById("id_update").value;
    let name = document.getElementById('nameU').value;
    let trabajo = document.getElementById('trabajoU').value;

  
    if (name == '') {
      Swal.fire({
        title: "Completa el campo TITULO",
        confirmButtonText: "Aceptar",
        icon: "error",
      });
    } else if (trabajo == '') {
      Swal.fire({
        title: "Completa el campo DESCRIPCIÓN",
        confirmButtonText: "Aceptar",
        icon: "error",
      });
    } else{
      swalWithBootstrapButtons.fire({
        title: 'Estás seguro de realizar los cambios?',
        text: "Te sugerimos que revises la información antes de actualizar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          const url = "https://reqres.in/api/users/" +id;
          const data = {id: id, name: name, trabajo: trabajo };
          console.log(data);
          fetch(url, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              console.log("Éxito:", response);
  
              swalWithBootstrapButtons.fire(
                'Actualización exitosa',
                'Se ha realizado la actualización exitosamente',
                'success'
              );

              getTabla();
              // Realiza cualquier acción necesaria después de la actualización exitosa aquí
            })
            .catch((error) => console.error("Error:", error));
        } else {
          swalWithBootstrapButtons.fire(
            'Acción cancelada',
            'No se ha realizado la actualización',
            'error'
          );
        }
      });
    }
  }
  
