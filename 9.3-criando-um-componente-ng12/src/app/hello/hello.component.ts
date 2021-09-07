import { Component } from '@angular/core';

@Component({
    selector: 'hello',
    template: `
        <h2>
            Hello {{nome}}
        </h2>
    `
})
export class HelloComponent {

    nome = 'Thiago';

}