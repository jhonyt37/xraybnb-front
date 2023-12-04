import { Component } from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";
import { SessionService } from "../../services/auth/session.service";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

    model: any[] = [
        {
            label: 'home',
            items: [
                {
                    label: 'home',
                    icon: 'pi pi-fw pi-home',
                    routerLink: ['/'],
                    scope: ['read:users', 'register:project', 'register:company', 'search:candidate', 'register:technical-test', 'register:candidate, register:performance-evaluation']
                }
            ]
        },
        {
            label: 'crear_proyecto',
            items: [
                {
                    label: 'crear_proyecto',
                    icon: 'pi pi-fw pi-book',
                    routerLink: ['/crear-proyecto'],
                    scope: ['register:project']
                }
            ]
        },
        {
            label: 'crear_equipo',
            items: [
                {
                    label: 'crear_equipo',
                    icon: 'pi pi-fw pi-user-plus',
                    routerLink: ['/crear-equipo'],
                    scope: ['register:job-group']
                }
            ]
        },
        {
            label: 'registar_resultado',
            items: [
                {
                    label: 'registar_resultado',
                    icon: 'pi pi-fw pi-check-square',
                    routerLink: ['/registar-resultados-prueba-tecnica'],
                    scope: ['register:technical-test']
                }
            ]
        },
        {
            label: 'registro_empresa',
            items: [
                {
                    label: 'registro_empresa',
                    icon: 'pi pi-fw pi-briefcase',
                    routerLink: ['/registrar-empresa'],
                    scope: ['register:company']
                }
            ]
        },
        {
            label: 'buscador',
            items: [
                {
                    label: 'buscador',
                    icon: 'pi pi-fw pi-search',
                    routerLink: ['/buscar-candidato'],
                    scope: ['search:candidate']
                }
            ]
        },
        {
            label: 'completar-perfil',
            items: [
                {
                    label: 'Completar perfil',
                    icon: 'pi pi-fw pi-copy',
                    routerLink: ['/completar-perfil'],
                    scope: ['register:profile-candidate']
                }
            ]
        },
        {
            label: 'citas',
            items: [
                {
                    label: 'citas',
                    icon: 'pi pi-fw pi-calendar-times',
                    routerLink: ['/listar-citas'],
                    scope: ['view:appointment']
                }
            ]
        },
        {
            label: 'equipos',
            items: [
                {
                    label: 'equipos',
                    icon: 'pi pi-fw pi-users',
                    routerLink: ['/asignar-candidato-equipo'],
                    scope: ['register:candidate']
                }
            ]
        },
        {
            label: 'eva_desempenio',
            items: [
                { label: 'eva_desempenio', icon: 'pi pi-fw pi-check-circle', routerLink: ['/evaluar-desempeño'], scope: ['register:performance-evaluation'] }
            ]
        },
    ];

    constructor(private authService: AuthService, private router: Router, private sessionService: SessionService) {
    }

    ngOnInit() {
        this.filterMenu();
    }

    getScopes() {
        return this.sessionService.getScopes();
    }

    filterMenu() {
        const permissions = this.getScopes();
        this.model = this.model.map((item) => {
            if (item.items) {
                item.items = item.items.map((subItem) => {
                    subItem.scope = subItem.scope.filter((scope) => {
                        return permissions.includes(scope);
                    });
                    return subItem.scope.length > 0 ? subItem : null;
                });
                item.items = item.items.filter((subItem) => {
                    return subItem !== null
                });
                return item;
            } else {
                return item.scope.find((scope) => {
                    return permissions.includes(scope);
                }) ? item : null;
            }
        });
    }

    logout() {
        this.authService.logout();
        this.sessionService.logout();
        this.router.navigate(['/iniciar-sesion']);
    }
}
