
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

var octopus = {
    init: function() {
        model.currentDog = model.dogs[0];
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

    addToCounter: function() {
        model.currentDog.clickCount++;
        dogView.render();
    }

};

var dogView = {
    init: function() {
        this.dogElem = document.getElementById('dog');
        this.dogName = document.getElementById('dog_name');
        this.dogImage = document.getElementById('dog_img');
        this.dogCount = document.getElementById('dog_count');

        this.dogImage.addEventListener('click', function() {
            octopus.addToCounter();
        });

        this.render();
    },

    render: function() {
        var currentDog = octopus.getCurrentDog();
        this.dogCount.textContent = currentDog.clickCount;
        this.dogName.textContent = currentDog.name;
        this.dogImage.src = currentDog.img;
    }

};

var dogListView = {
    init: function() {
        this.dogList = document.getElementById('dog_list');
        this.render();
    },

    render: function() {
        var dog, elem, i;
        var dogs = octopus.getAllDogs();
        this.dogList.innerHTML = '';

        for (i = 0; i < dogs.length; i++) {
            dog = dogs[i];

            elem = document.createElement('li');
            elem.textContent = dog.name;

            elem.addEventListener('click', (function(dogCopy) {
                return function() {
                    octopus.setCurrentDog(dogCopy);
                    dogView.render();
                };
            })(dog));

            this.dogList.appendChild(elem);
        }
    }
};
octopus.init();
