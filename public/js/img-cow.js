(function() {

  var fileInput = document.getElementById('file-input');
  var uploadPreview = document.getElementById('upload-preview');
  var submitButton = document.getElementById('submit-button');

  fileInput.addEventListener('change', handleFileInput, false);
  submitButton.addEventListener('mousedown', submitImage, false);

  function handleFileInput(e) {
    var file = e.target.files[0];

    if (!file.type.match('image.*')) return;

    var reader = new FileReader();
    reader.onload = (function(f) {
      return function(e) {
        uploadPreview.innerHTML = ['<img src="', e.target.result, '" name="', f.name, '">'].join('');
      };
    })(file);

    reader.readAsDataURL(file);
  }

  function submitImage() {
    var src = uploadPreview.childNodes[0].src;
    var name = Date.now() + '_' + uploadPreview.childNodes[0].name;

    if (typeof src === 'undefined' || typeof name === 'undefined') return;

    var http = new XMLHttpRequest();
    var data = JSON.stringify({ 
	  name: name,
	  src: src
	}); 

    http.open('POST', '/upload', true);

    http.setRequestHeader("Content-type", "application/json");
    http.setRequestHeader("Content-lenght", data.length);
    http.setRequestHeader("Connection", "close");

    http.onreadystatechange = function() {
      if (http.readyState == 4 && http.status == 200) {
        populateFileUrl(http.responseText);
      }
    };
	
    http.send(data);
  }
  
  function populateFileUrl(urlString) { 
    var fileUrlInput = document.getElementById('file-url'); 
    fileUrlInput.value = urlString; 
  }

})();
