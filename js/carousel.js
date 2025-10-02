function Carousel(options)
{
    // initialize class properties
    this.animationDuration = 500; // milliseconds
    this.arrowsFade = 0.5;
    this.arrowsOnTop = true;
    this.autoSwipe = false;
    this.autoSwipeBreak = 4000; // milliseconds
    this.container = null
    this.currentImages = [1];
    this.images = null;
    this.imagesContainer = null;
    this.imagesHeight = 0;
    this.imagesStep = 1; // number of images to rotate
    this.imagesToDisplay = 3; // this is the minimum value to display
    this.imagesWidth = 0; // the with of the images in the carousel
    this.leftArrow = null;
    this.leftPosition = 0;
    this.percentageCrop = 0;
    this.rightArrow = null;
    this.rightPosition = 0;
    this.wrap = true;
    
    // default value
    var disableArrows = false;
    
    // check options
    if ((options !== null) && (options !== undefined))
    {
        // check container
        if ((options.container !== null) && (options.container !== undefined) && (options.container.length > 0))
        {
            // set carousel container
            this.container = $('#' + options.container);
        }
        
        // check images container
        if ((options.imagesContainer !== null) && (options.imagesContainer !== undefined) && (options.imagesContainer.length > 0))
        {
            // set images container
            this.imagesContainer = $('#' + options.imagesContainer);
        }
        
        // check if arrows should be placed on top
        if ((options.arrowsOnTop !== null) && (options.arrowsOnTop !== undefined))
        {
            // check arrows on top value
            if (options.arrowsOnTop == false)
            {
                // don't show arrows on top
                this.arrowsOnTop = false;
            }
        }
        
        // check left arrow
        if ((options.leftArrow !== null) && (options.leftArrow !== undefined) && (options.leftArrow.length > 0))
        {
            // set left arrow
            this.leftArrow = $('#' + options.leftArrow);
            
            // check if arrows are not on top
            if (this.arrowsOnTop == false)
            {
                // remove background
                this.leftArrow.css('background-image', 'none');
            }
        }
        
        // check right arrow
        if ((options.rightArrow !== null) && (options.rightArrow !== undefined) && (options.rightArrow.length > 0))
        {
            // set right arrow
            this.rightArrow = $('#' + options.rightArrow);
            
            // check if arrows are not on top
            if (this.arrowsOnTop == false)
            {
                // remove background
                this.rightArrow.css('background-image', 'none');
            }
        }
        
        // check percentage crop
        if ((options.percentageCrop !== null) && (options.percentageCrop !== undefined) && !isNaN(options.percentageCrop))
        {
            // set percentage crop
            this.percentageCrop = options.percentageCrop;
        }
        
        // check images to display
        if ((options.imagesToDisplay !== null) && (options.imagesToDisplay !== undefined) && !isNaN(options.imagesToDisplay) && (options.imagesToDisplay > 3))
        {
            // set images to display
            this.imagesToDisplay = options.imagesToDisplay;
        }
        
        // check auto swipe
        if ((options.autoSwipe !== null) && (options.autoSwipe !== undefined))
        {
            // check auto swipe value
            if (options.autoSwipe == true)
            {
                // auto swipe images
                this.autoSwipe = true;
            }
        }
        
        // check auto swipe break
        if ((options.autoSwipeBreak !== null) && (options.autoSwipeBreak !== undefined) && !isNaN(options.autoSwipeBreak) && (options.autoSwipeBreak > 0))
        {
            // set auto swipe break
            this.autoSwipeBreak = options.autoSwipeBreak;
        }
        
        // check images
        if ((options.images !== null) && (options.images !== undefined) && (options.images.length > 0))
        {
            // set images
            this.images = $('.' + options.images);
            
            // check if iamges were found
            if (this.images.length > 0)
            {
                // check images to display
                if ((this.arrowsOnTop == false) && (this.imagesToDisplay > this.images.length))
                {
                    // reset images to display
                    this.imagesToDisplay = this.images.length;
                    
                    // disable arrows
                    disableArrows = true;
                }
                
                // get first image size
                // this information will be used for all images
                var imageSize = this.getImageSize($(this.images[0]).find('img').attr('src'));
                
                // check image width information
                if ((imageSize.width !== null) && (imageSize.width !== undefined) && !isNaN(imageSize.width))
                {
                    // set images width
                    this.imagesWidth = imageSize.width;
                }
                
                // check image height information
                if ((imageSize.height !== null) && (imageSize.height !== undefined) && !isNaN(imageSize.height))
                {
                    // set images height
                    this.imagesHeight = imageSize.height;
                }
                
                // check images container
                if (this.imagesContainer !== null)
                {
                    // check if arrows are on top
                    if (this.arrowsOnTop == true)
                    {
                        // copy the first and last images to the front and back of the array
                        this.imagesContainer.prepend($(this.images[this.images.length - 1]).clone());
                        this.imagesContainer.append($(this.images[0]).clone());
                        
                        // reset the images
                        this.images = $('.' + options.images);
                    }

                    // set container css width
                    this.imagesContainer.css('width', this.images.length * this.imagesWidth);
                    
                    // set container width
                    this.imagesContainer.width(this.images.length * this.imagesWidth);
                }
                
                // check carousel container
                if ((this.container !== null))
                {
                    // set initial width
                    var width = this.imagesToDisplay * this.imagesWidth - (((this.percentageCrop * this.imagesWidth) / 100) * 2);
                    
                    // check if arrows should not be displayed on top
                    if (this.arrowsOnTop == false)
                    {
                        // get arrow size
                        var arrowSize = this.getImageSize($(this.leftArrow).find('img').attr('src'));
                        
                        // check arrow width information
                        if ((arrowSize.width !== null) && (arrowSize.width !== undefined) && !isNaN(arrowSize.width))
                        {
                            // add arrow size to carousel container
                            width += (arrowSize.width * 2);
                        }
                    }
                    
                    // set container css width
                    this.container.css('width', width);
                    
                    // set container width
                    this.container.width(width);
                }
            }
        }
        
        // check wrap
        if ((options.wrap !== null) && (options.wrap !== undefined))
        {
            // check wrap value
            if (options.wrap == false)
            {
                // disable wrap for carousel
                this.wrap = false;
            }
        }
    }
    
    // set left position
    this.leftPosition = -(this.percentageCrop * this.imagesWidth) / 100;
    
    // set right position
    this.rightPosition = this.imagesContainer.width() - (2 * this.imagesWidth) - (this.imagesWidth - ((this.percentageCrop * this.imagesWidth) / 100)) - ((this.imagesToDisplay - 3) * this.imagesWidth);
    
    // check if arrows should not be displayed on top
    if (this.arrowsOnTop == false)
    {
        // set new left position for images container
        this.leftPosition = arrowSize.width;
        
        // set new right position for the images container
        this.rightPosition -= arrowSize.width;
    }
    
    // check if arows are on top
    if (this.arrowsOnTop == true)
    {
        // default value
        var i = 1;
        
        // set the initial images to display
        while (i <= (this.imagesToDisplay - 2))
        {
            // add image
            this.currentImages[i - 1] = i;

            // increment counter
            i++;
        }
    }
    else
    {
        // default value
        var j = 0;
        
        // set the initial images to display
        while (j < this.imagesToDisplay)
        {
            // add image
            this.currentImages[j] = j;

            // increment counter
            j++;
        }
    }
    
    // INITIAL DISPLAY
    // set position for the images container
    this.imagesContainer.css('left', this.leftPosition + 'px');
    
    // check if arrows should be disabled
    if (disableArrows == true)
    {
        // enable arrows
        this.disableArrow(this.leftArrow, 'left');
        this.disableArrow(this.rightArrow, 'right');
    }
    else
    {
        // enable arrows
        this.enableArrow(this.leftArrow, 'left');
        this.enableArrow(this.rightArrow, 'right');
    }
    
    // check if wrap is disabled
    if (this.wrap == false)
    {
        // disable left arrow
        this.disableArrow(this.leftArrow);
    }
    
    // show images
    this.displayImages();
    
    // show carousel
    this.container.css('display', 'inherit');
    
    // check auto swipe
    if (this.autoSwipe == true)
    {
        // add auto swipe
        this.idle();
    }
    
    // check if arrows are not disabled
    if (disableArrows == false)
    {
        // enable swipe for touch screens
        //this.enableSwipe();
    }
}

Carousel.prototype.enableArrow = function(arrow, action)
{
    // check arrow and action
    if ((arrow !== null) && (action !== null) && (action !== undefined))
    {
        // check action
        switch (action)
        {
            // left action
            case 'left':
                // get current object
                var currentObject = this;
                
                // enable left arrow action
                arrow.bind('click', function() {
                    currentObject.left();
                });
                
                // exit loop
                break;
            
            case 'right':
                // get current object
                var currentObject = this;
                
                // enable right arrow action
                arrow.bind('click', function() {
                    currentObject.right();
                });
                
                // exit loop
                break;
        }
        
        // show image
        arrow.find('img').fadeTo('fast', 1);
    }
}

Carousel.prototype.enableSwipe = function()
{
    // get current object
    var currentObject = this;
    
    // add swipe events
    $(document).ready(function()
    {
        // bind swipe events for carousel container
        currentObject.container.live('swipeleft swiperight', function(event)
        {
            // check event
            if (event.type == 'swipeleft')
            {
                // move forward
                currentObject.right();
            }
            else if (event.type == 'swiperight')
            {
                // move back
                currentObject.left();
            }
        });
    });
}

Carousel.prototype.disableArrow = function(arrow)
{
    // check arrow
    if (arrow !== null)
    {
        // remove arrow action
        arrow.unbind('click');
        
        // fade image
        arrow.find('img').fadeTo('fast', this.arrowsFade);
    }
}

Carousel.prototype.displayImages = function(step, end)
{
    // check images
    if ((this.images !== null) && (this.imagesContainer !== null))
    {
        // check how many images are in the container
        if (this.images.length >= this.imagesToDisplay)
        {
            // check if wrap is disabled
            if (this.wrap == false)
            {
                // check current images
                if (this.currentImages[0] == 1)
                {
                    // disable the left arrow
                    this.disableArrow(this.leftArrow);
                }
                else if (this.currentImages[this.currentImages.length - 1] == (this.images.length - 2))
                {
                    // disable the right arrow
                    this.disableArrow(this.rightArrow);
                }
            }
            
            // get current object
            var currentObject = this;
            
            // go through images
            this.images.each(function()
            {
                // reset style for images desciption
                $(this).find('span').css('display', 'none');
            });
            
            // check step
            if ((step !== null) && (step !== undefined) && (end !== null) && (end !== undefined))
            {
                // default value
                var position = 0;
                
                // check step value
                if (step == 'forward')
                {
                    // check if wrap is enabled
                    if (this.wrap && (end == true))
                    {
                        // reset position of the images container
                        position = this.leftPosition + 'px';
                    }
                    else
                    {
                        // set position for forward movement
                        position = '-=' + this.imagesWidth + 'px';
                    }
                }
                else
                {
                    // check if wrap is enabled
                    if (this.wrap && (end == true))
                    {
                        // reset position of the images container
                        position = '-' + this.rightPosition + 'px';
                    }
                    else
                    {
                        // set position for back movement
                        position = '+=' + this.imagesWidth + 'px';
                    }
                }
                
                // animation properties
                var properties = {
                    left: position
                }
                
                // complete function
                var complete = function()
                {
                    // go through current images
                    $(currentObject.currentImages).each(function()
                    {
                        // display the image description
                        $(currentObject.images[this]).find('span').css('display', 'inherit');
                    });
                };
                
                // animate the images
                this.imagesContainer.animate(properties, this.animationDuration, complete);
            }
            else
            {
                // go through current images
                $(this.currentImages).each(function()
                {
                    // display the image description
                    $(currentObject.images[this]).find('span').css('display', 'inherit');
                });
            }
        }
    }
}

Carousel.prototype.getImageSize = function(src)
{
    // default values
    var width = 0;
    var height = 0;
    
    // create an image object
    var image = new Image();
    
    // set image source
    image.src = src;
    
    // get image width and height
    $(image).ready(function()
    {
        // set width
        width = image.width;
        
        // set height
        height = image.height;
    });
    
    return {
        'width': width,
        'height': height
    };
}

Carousel.prototype.idle = function(swipe)
{
    // check swipe
    if ((swipe !== null) && (swipe !== undefined) && (swipe == true))
    {
        // move forward
        this.right();
    }
    
    // get current object
    var currentObject = this;
    
    //set timeout
    setTimeout(function() {
        currentObject.idle(true);
    }, this.autoSwipeBreak);
}

Carousel.prototype.left = function()
{
    // set the new image
    this.setCurrentImages('back');
    
    // check if wrap is disabled
    if (!this.wrap)
    {
        // enable left arrow
        this.enableArrow(this.rightArrow, 'right');
    }
}

Carousel.prototype.right = function()
{
    // set the new image
    this.setCurrentImages('forward');
    
    // check if wrap is disabled
    if (!this.wrap)
    {
        // enable left arrow
        this.enableArrow(this.leftArrow, 'left');
    }
}

Carousel.prototype.setCurrentImages = function(step)
{
    // check value
    if ((step !== null) && (step !== undefined))
    {
        // default values
        var tempImages = [];
        var end = false;
        
        // check if wrap is enabled
        if (this.wrap == true)
        {
            // check if arrows are on top
            if (this.arrowsOnTop == true)
            {
                // check current images
                if ((this.currentImages[0] == 1) && (step == 'back'))
                {
                    // set end flag for first position
                    end = true;

                    // default values
                    var j = (this.images.length - 2) - (this.imagesToDisplay - 2);
                    var k = 0;

                    // set the initial images to display
                    while (j < (this.images.length - 2))
                    {
                        // add image
                        tempImages[k] = j + 1;

                        // decrement counter
                        j++;
                        k++;
                    }
                }
                else if ((this.currentImages[this.currentImages.length - 1] == (this.images.length - 2)) && (step == 'forward'))
                {
                    // set end flag for last position
                    end = true;

                    // default value
                    var i = 1;

                    // set the initial images to display
                    while (i <= (this.imagesToDisplay - 2))
                    {
                        // add image
                        tempImages[i - 1] = i;

                        // increment counter
                        i++;
                    }
                }
            }
            else
            {
                // check current images
                if ((this.currentImages[0] == 0) && (step == 'back'))
                {
                    // set end flag for first position
                    end = true;

                    // default values
                    var m = (this.images.length - 2) - (this.imagesToDisplay - 2);
                    var n = 0;

                    // set the initial images to display
                    while (m < this.images.length)
                    {
                        // add image
                        tempImages[n] = m;

                        // decrement counter
                        m++;
                        n++;
                    }
                }
                else if ((this.currentImages[this.currentImages.length - 1] == (this.images.length - 1)) && (step == 'forward'))
                {
                    // set end flag for last position
                    end = true;

                    // default value
                    var p = 0;

                    // set the initial images to display
                    while (p < this.imagesToDisplay)
                    {
                        // add image
                        tempImages[p] = p;

                        // increment counter
                        p++;
                    }
                }
            }
        }
        
        // get current object
        var currentObject = this;
        
        // check if an ending position has been found
        if (end == false)
        {
            // go through current images
            $(this.currentImages).each(function(index)
            {
                // check step value
                if (step == 'forward')
                {
                    // set new value
                    tempImages[index] = this + currentObject.imagesStep;
                }
                else
                {
                    // set new value
                    tempImages[index] = this - currentObject.imagesStep;
                }
            });
        }
        
        // set new images position
        this.currentImages = tempImages;
        
        // show new images
        this.displayImages(step, end);
    }
}