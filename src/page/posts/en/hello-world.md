
This is my first post. Newertheless just like so many of my "Hello World"-programs it might also be
my last.

This site is generated using a custom site generator written in JavaScript and run using Node.js to generate
all the files used for this website. The posts are actualy written in Markdown and then compiled by the
generator using a custom Markdown compiler. It supports some of the basic and extended Markdown features,
but it is not as powerfull as some Markdown languages. Here are some of the things supported:

Given I am a programmer, I will probably use quite a bit of code. So I have support for both inline code
elements like this one: `printf`, and also code blocks with syntax highliting as follows.

```C
#incude <stdio.h>

int main(int argc, char** argv) {
    printf("Hello World!\n");
    return EXIT_SUCCESS;
}
```
[This is a C program]

```smalltalk
Smalltalk tools messageList
	browse: ChangeSet current changedMessageList
	title: 'Current Change Set'
```
[This is some Smalltalk code]

Other thing my Markdown converter supports are tables, images and footnotes[^1]. 

 Country | Capital | Area
---------|---------|------------
Italy    | Rome    | 302,073 km²
Austria  | Vienna  | 83,879 km²
Switzerland | Bern | 41,285 km²
Germany  | Berlin  | 357,022 km²
[^This is a table]

![The Mandelbrot set](/projimg/mandelbrot.jpeg=250x "The Mandelbrot set")
[^This is a section of the Mandelbrot set]


---

[^1]: This is a footnote
