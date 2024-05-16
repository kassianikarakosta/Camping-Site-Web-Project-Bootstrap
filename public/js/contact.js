document.getElementById('message').addEventListener('input', function () {
    var charCount = this.value.length;
    document.getElementById('charCount').textContent = charCount + ' / 500 characters';
});