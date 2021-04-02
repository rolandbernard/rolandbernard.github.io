## About

This is the source code repository for my personal website. It is basically a static site generator
written specificaly for this website. I did not use an exesting static site generator manly because
I wanted to have as much freedom as possible. Using the [jekyll][jekyll] generator, for example,
would have been easier because that is already what is being used by Github Pages, but it would also
have limited what I could do in the future. (Without porting everythin to a new system.) A big
factor was also that I just wanted to build it myself, since I enjoy programming and the goal was
not the result but actually implementing it.

## A little overview

The source is split into two main parts. The first is in `src/build` and includes the code that
handles only building the website. The second part can be found in `src/page` and contains all of
the content. There is some overlap here because technicaly all the code is used to 'build' the
website, but generaly files that are not specific to the contents of the page can be found in the
`src/build` directory.

The build enters in `src/build/build.js` and from there calls functions to generate HTML documents
with different parameters and saves them using the `Builder`-class defined in
`src/build/builder.js`.

The Markdown compiler can be found in `src/build/markdown.js` and supports all basic Markdown
features and some more advanced features. Is is called from within the post view template in
`src/page/views/post-view.js` for each post.

[jekyll]: https://jekyllrb.com/

