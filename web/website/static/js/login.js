function select(n, element){
    element = document.querySelectorAll(element);
    n = n == ('all' || 'every') ? n : isNaN(n) ? Number(n.slice(0, -2)) : n;
    return n == ('all' || 'every') ? element : element[n - 1];
}
select('1st', '.eye').addEventListener('click', (eventLog) => {
    var eye = select(1, '.eye-toggle');
    eye.classList.toggle('fa-eye');
    eye.classList.toggle('fa-eye-slash');
    if(eye.classList.contains('fa-eye-slash')){
        select(1, '#sd-user-pass').type = 'password';
    }
    else{
        select(1, '#sd-user-pass').type = 'text';
    }
});
