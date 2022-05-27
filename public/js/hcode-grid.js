class HcodeGrid {

    constructor(configs){

        configs.listeners = Object.assign({
            afterUpdateClick: (e) =>{
        
                $('#modal-update').modal('show');
        
            },
            afterDeleteClick: (e) =>{
        
                window.location.reload();
        
            },
            afterFormCreate: (e) =>{

                window.location.reload();

            },
            afterFormUpdate: (e) =>{

                window.location.reload();
            },
            afterFormCreateError: (e) => {

                alert('Nao foi possivel enviar o formulario!');

            },
            afterFormUpdateError: (e) => {

                alert('Nao foi possivel enviar o formulario!');

            }

        }, configs.listeners);

        this.option = Object.assign({}, {
            formCreate:'#modal-create form',
            formUpdate:'#modal-update form',
            btnUpdate:'btn-update',
            btnDelete:'btn-delete',
            onUpdateLoad: (form, name, data) => {

                let input = form.querySelector(`[name=${name}]`);
                if(input) input.value = data[name];

            }
        }, configs);

        this.rows = [...document.querySelectorAll('table tbody tr')];

        this.initForms();
        this.initButtons();

    }

    // 

    initForms(){

        // Create

        this.formCreate = document.querySelector(this.option.formCreate);

        if(this.formCreate){

            this.formCreate.save({
                success: () =>{
                    this.fireEvents('afterFormCreate');
                },
                failure: () =>{
                    this.fireEvents('afterFormCreateError');
                }
            });
        }

       // Update
      
        this.formUpdate = document.querySelector(this.option.formUpdate);

        if(this.formUpdate){
      
            this.formUpdate.save({
                success: () =>{
                    this.fireEvents('afterFormUpdate'); 
                },
                failure: () =>{
                    this.fireEvents('afterFormUpdateError');
                }
            });
        }
        
    }

    // 

    fireEvents(name, args){

        if(typeof this.option.listeners[name] === 'function') this.option.listeners[name].apply(this, args)

    }

    // 

    getTrData(e){

        let tr = e.srcElement.parentElement.parentElement;
        return JSON.parse(tr.dataset.row);

    }

    // Update

    btnUpdateClick(e){

        this.fireEvents('beforeUpdateClick', [e]);
        
        let data = this.getTrData(e);

        for(let name in data){

            this.option.onUpdateLoad(this.formUpdate, name, data);  
    
        }
    
        this.fireEvents('afterUpdateClick', [e]);

    }

    // Delete

    btnDeleteClick(e){

        this.fireEvents('beforeDeleteClick');

        let data = this.getTrData(e);
    
        if(confirm(eval('`' + this.option.deleteMsg + '`'))){
    
            fetch(eval('`' + this.option.deleteUrl + '`'),{
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(json => {
    
            this.fireEvents('afterDeleteClick');
        
            }); 
        
        };

    }

    // 

    initButtons(){

        this.rows.forEach(row => {

            [...row.querySelectorAll('.btn')].forEach(btn => {

                btn.addEventListener('click', e =>{

                    if(e.target.classList.contains(this.option.btnUpdate)){

                        this.btnUpdateClick(e);

                    } else if(e.target.classList.contains(this.option.btnDelete)){

                        this.btnDeleteClick(e);

                    } else{

                        this.fireEvents('buttonClick', [e.target, this.getTrData(e), e])

                    }

                });

            })

        });

    }

}