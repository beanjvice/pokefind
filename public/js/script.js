document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.querySelector('.save-btn');
    const pokemonName = document.querySelector('.title')?.textContent;

    if(!saveBtn || !pokemonName) return;
    let saved = JSON.parse(localStorage.getItem('favorites')) || [];

    if(saved.includes(pokemonName)){
        saveBtn.classList.add('saved');
        saveBtn.querySelector('span').textContent = 'Saved';
    }

    saveBtn.addEventListener('click', () => {
        saveBtn.classList.toggle('saved');

        if (saveBtn.classList.contains('saved')){
            if(!saved.includes(pokemonName)){
                saved.push(pokemonName);
            }
        } else {
            saved = saved.filter(p => p !== pokemonName);
        }
        
        localStorage.setItem('favorites', JSON.stringify(saved));
        saveBtn.querySelector('span').textContent = saveBtn.classList.contains('saved') ? 'Saved' : 'Save';
    });
});

const btn = document.querySelector("#more")
btn?.addEventListener('click',function(){
  console.log('clicked')
  const id = btn.getAttribute("key") 
  console.log(id)
  window.location.replace('/pokemon/'+id)
})
