
Hier sind wir, ich habe mir eine persönliche Website erstellt und dies ist mein erster Post. Ich
schreibe diesen Post aber weniger wegen des Inhalts und mehr nur um mein Build-System und meinen
Markdown-Compiler zu testen.  Dieser Text hier ist auch wichtig um zu testen, ob das Veröffentlichen
desselben Posts in verschiedenen Sprachen wie erwartet funktioniert.  Dieser Text enthält nicht
dieselben Informationen wie die englische Version und dies ist so mit Absicht. Der Inhalt ist mir,
für diesen Post, nämlich nicht wichtig.  Ich bin kein großer Autor und darum geht es mir hierbei
auch nicht.  Ich werde in diesem Post aber mein Build-System etwas beschreiben und einige Markdown
Elemente austesten.

Fangen wir damit an, dass es auf dieser Seite kein JavaScript gibt, zumindest nicht im Browser. Die
ganze Seite wurde allerdings mithilfe eines JavaScript Generators generiert. Einige der Dateien,
darunter die Bilder, Videos und Schriftarten, werden dabei einfach von einem Ordner in den anderen
kopiert. Andere werden jedoch mithilfe des JavaScript Programms generiert.  Auch die Markdown
Dokumente werden mithilfe eines von mir eigens geschriebenen Compilers generiert.

Die Webseite besteht aus folgenden Ansichten:
* Home
* Projekte
* Posts
    * Hallo Welt!
    * ...

Alle diese Ansichten teilen sich dabei einige Komponenten. Der Header zum Beispiel und der Footer
haben in allen diesen Ansichten den gleichen Aufbau.  Diese Komponenten werden deshalb auch nicht
jedes Mal neu erstellt, sondern einmal implementiert und dann wiederverwendet. Auch alle Posts
verwenden ein einheitliches Template, der Inhalt wird dabei aus Markdown compiliert.  Was der
Generator der Website auch macht, ist die HTML Dokumente mithilfe von terser komprimieren.

Hier sind einige Dinge die der Markdown Compiler darstellen kann:

```C
#include <stdio.h>

int main(int argc, char** argv) {
    printf("Hallo Welt!\n");
    return 0;
}
```
[Dies ist ein C Programm[^1]]

    * src
        * build
        * page
            * icons
            * info
            * posts
            * views
[Code Blöcke können auch _ohne_ Zeilennummern erstellt werden]

Das wäre dann alles für heute.
Noch einen schönen Tag und bis zum nächsten Mal.

\

---

[^1]: Dies ist eine Fußnote
