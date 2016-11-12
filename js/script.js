/*----------Model-------------*/

var model = {
    currentDog: null,
    adminShow: false,
    dogs: [
        {
            clickCount : 0,
            name : 'Beige',
            img : 'img/dog1.jpg',
            id : '1'
        },
        {
            clickCount : 0,
            name : 'Milou',
            img: 'img/dog2.jpg',
            id : '2'
        },
        {
            clickCount : 0,
            name : 'Paf',
            img : 'img/dog3.jpg',
            id : '3'
        },
        {
            clickCount : 0,
            name : 'Pouf',
            img : 'img/dog4.jpg',
            id : '4'
        },
        {
            clickCount : 0,
            name : 'Junior',
            img : 'img/dog5.jpg',
            id : '5'
        }
    ]
};

/*------------Octopus------------*/

var octopus = {
    init: function() {
        // Initialize to the first dog
        model.currentDog = model.dogs[0];
        // Initialize the view
        dogListView.init();
        dogView.init();
        adminView.init();
        adminView.hide();
    },

    getCurrentDog: function () {
        return model.currentDog;
    },

    getAllDogs: function () {
        return model.dogs;
    },

    setCurrentDog: function(dog) {
        model.currentDog = dog;
    },

    // Add 1 click to the counter
    addToCounter: function() {
        model.currentDog.clickCount++;
        dogView.render();
    },

    // Open the admin form
    openAdmin: function() {
        if (model.adminShow === false) {
            model.adminShow = true;
            adminView.show();
        }

        else if (model.admin === true) {
            model.admin = false;
            adminView.hide();
        }
    },

    closeAdmin: function() {
        adminView.hide();
    },

    updateAdmin: function() {
        model.currentDog = {
            name : form.inputName.value,
            clickCount: form.inputCliks.value,
            img: inputUrl.value,
        };

        dogView.render();
        dogListView.render();
        adminView.hide();
    }

};

/*--------------View-------------*/

var adminView = {
    init: function() {

        // Get value from the DOM element
        this.inputName = document.getElementById('input_name');
        this.inputUrl = document.getElementById('input_url');
        this.inputCliks = document.getElementById('input_clicks');

        this.adminBtn = document.getElementById('adminBtn');
        this.adminSave = document.getElementById('adminSave');
        this.adminCancel = document.getElementById('adminCancel');


        // Display the DOM form when admin btn Admin is clicked
        this.adminBtn.addEventListener('click', function() {
            octopus.openAdmin();
        });

        // Hide the DOM form when cancel btn is clicked
        this.adminCancel.addEventListener('click', function() {
            octopus.closeAdmin();
        });

        // Save the changes made is the DOM form when save btn is clicked
        this.adminSave.addEventListener('click', function() {
            octopus.updateAdmin();
        });

        this.render();
    },

    render: function() {
        var currentDog = octopus.getCurrentDog();
        this.inputName.value = currentDog.name;
        this.inputUrl.value = currentDog.img;
        this.inputCliks.value = currentDog.clickCount;
    },

    show: function(){
        var adminForm =document.getElementById('admin_form');
        adminForm.style.display = 'block';
        },

    hide: function(){
        var adminForm =document.getElementById('admin_form');
        adminForm.style.display = 'none';
    }
};

var dogView = {
    init: function() {
        // Get element from the DOM
        this.dogElem = document.getElementById('dog');
        this.dogName = document.getElementById('dog_name');
        this.dogImage = document.getElementById('dog_img');
        this.dogCount = document.getElementById('dog_count');

        // Append a click to the selected dog
        this.dogImage.addEventListener('click', function() {
            octopus.addToCounter();
        });

        // Render DOM Element
        this.render();
    },

    render: function() {
        // Update the DOM element with their values
        var currentDog = octopus.getCurrentDog();
        this.dogCount.textContent = "Clicked "+currentDog.clickCount+" times";
        this.dogName.textContent = currentDog.name;
        this.dogImage.src = currentDog.img;
    }
};

var dogListView = {
    init: function() {
        // Get element from the DOM
        this.dogList = document.getElementById('dog_list');
        // Render DOM Element
        this.render();
    },

    render: function() {
        var dog, elem, i;
        // Get all the dogs
        var dogs = octopus.getAllDogs();
        // Empty the dog list
        this.dogList.innerHTML = '';

        // Loop for number of cats in the model
        for (i = 0; i < dogs.length; i++) {
            dog = dogs[i];

            // Create <li> element in the DOM
            elem = document.createElement('li');
            elem.className = 'list';
            // Append the name of the dog to the <li>
            elem.textContent = dog.name;
            // When a dog is clicked, it set the current dog and display it.
            // It also connect the value of the dog variable to the click event function
            elem.addEventListener('click', (function(dogCopy) {
                return function() {
                    octopus.setCurrentDog(dogCopy);
                    dogView.render();
                };
            })(dog));
            // Add the element to the <li>
            this.dogList.appendChild(elem);
        }
    }
};

// Run the app
octopus.init();
