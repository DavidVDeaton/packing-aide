export default function CloseForm(obj, add, edit){
    if(obj === undefined){
        add(false);
    } else{
        edit(false);
    }
}