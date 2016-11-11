/*----------Model-------------*/

var model = {
    currentDog: null,
    dogs: [
        {
            clickCount : 0,
            name : 'Medor',
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
    }

};

/*--------------View-------------*/

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
        this.dogCount.textContent = currentDog.clickCount;
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
