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
            btnUpdate:'.btn-update',
            btnDelete:'.btn-delete'
        }, configs);

        this.initForms();
        this.initButtons();

    }

    // 

    initForms(){

        // Create

        this.formCreate = document.querySelector(this.option.formCreate);

        this.formCreate.save().then(json =>{
      
          this.fireEvents('afterFormCreate');
      
        }).catch(err => {
      
            this.fireEvents('afterFormCreateError');
      
        });
      
       // Update
      
        this.formUpdate = document.querySelector(this.option.formUpdate);
      
        this.formUpdate.save().then(json =>{
      
            this.fireEvents('afterFormUpdate');
        
            }).catch(err => {
        
                this.fireEvents('afterFormUpdateError');
        
        });

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

    // 

    initButtons(){

        // Update

        [...document.querySelectorAll(this.option.btnUpdate)].forEach(btn => {
      
        btn.addEventListener('click', e =>{

            this.fireEvents('beforeUpdateClick', [e]);
        
            let data = this.getTrData(e);

            for(let name in data){
        
            let input = this.formUpdate.querySelector(`[name=${name}]`);
        
            switch(name){
        
                case 'date':
                if(input) input.value = moment(data[name]).format('YYYY-MM-DD');
                break;
        
                default:
                if(input) input.value = data[name];
        
            }
        
            }
        
            this.fireEvents('afterUpdateClick', [e]);
        
            })
        });
      
        // Delete
      
        [...document.querySelectorAll(this.option.btnDelete)].forEach(btn => {

            btn.addEventListener('click', e => {

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
            });

          });
    }

}