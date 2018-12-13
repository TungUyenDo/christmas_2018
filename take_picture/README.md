# structure-pug-sass-webpack

# Structure

src
    assets
        images
        fonts
    inline-script
    lib ( store 3rd )
    scripts ( script )
        bootstrap (file js to build )
    styles
    template
        components
        pages

# Path URL assets
template : "./assets"
scripts : "../assets"
styles : "../assets"

## Build

Run `npm run start` ( build develop)
Run `npm run build` (build prod)


<!-- notes -->
font-size: 36px;
<!-- max width là từ lớn tới nhỏ -->
@media(max-width: 1400px) {
    margin-bottom: -13px;
    
}
@media(max-width: 1024px) {
    font-size: 30px;
    
}


<!-- min width thì đặt từ nhỏ tới lớn -->
@media(min-width: 1200px) {
    font-size: 32px;
}
@media(min-width: 1350px) {
    font-size: 36px;
    margin-bottom: -4px
}

<!-- trong 1 khoảng nào đó -->
 @media only screen and (min-width:1200px) and (max-width: 1340px) {
    padding-right: 75px
}