var menu =[];
function obtenerMenu ( ROLE ){
    menu =[];
    incorporaMenuPrincipal();
        
    if ( ROLE === 'INITIAL_ROLE'){
       
    }

    if ( ROLE === 'PROFESIONAL_ROLE'){
       
        incorporaMenuPacientes(); // ver lista, ver fichas y agregar
    }
    if ( ROLE === 'USER_ROLE'){
        
        incorporaMenuProfesionales();
        incorporaMenuReservas();
        incorporaMenuPacientes(); // ver lista y agregar
    }
    if ( ROLE === 'PESQUISA_ROLE'){
        
        incorporaMenuPesquisa();
    }

    if ( ROLE === 'ADMIN_ROLE'){
        
        incorporaMenuProfesionales();
        incorporaMenuReservas();
        incorporaMenuPacientes();
        incorporaMenuPesquisa();
        incorporaMenuMantenimiento();
        
    }

    return menu;

}

function incorporaMenuPrincipal(){
    menu.push(
        
        {
            path: '',               //0     
            title: 'Principal',           // name of the label
            icon: '',
            class: 'nav-small-cap',      // this class is necessary
            label: '',
            labelClass: '',
            extralink: true,
            submenu: []
        },
        {
            path: '/starter',       //1
            title: 'Inicio',             // menu title
            icon: 'mdi mdi-widgets',      // menu icon
            class: '',                    // additional classes
            label: '',
            labelClass: '',
            extralink: false,
            submenu: []                   // submenu items if available
        }

    )
}

// function incorporaMenuProfesionales(){
//     menu.push(
//         {
//         path: '/pages/profesionales',   //2
//         title: 'Profesionales',             // menu title
//         icon: 'mdi mdi-human-male-female',      // menu icon
//         class: '',                    // additional classes
//         label: '',
//         labelClass: '',
//         extralink: false,
//         submenu: []                   // submenu items if available
//         }

//     );
// }

function incorporaMenuProfesionales(){
    menu.push(
        {
        path: '',   //2
        title: 'Profesionales',             // menu title
        icon: 'mdi mdi-human-male-female',      // menu icon
        class: 'has-arrow',                    // additional classes
        label: '2',
        labelClass: 'label label-rouded label-themecolor pull-right',
        extralink: false,
        submenu: [
                    {
                        path: '/pages/profesionales',
                        title: 'Lista Profesionales',
                        icon: '',
                        class: '',
                        label: '',
                        labelClass: '',
                        extralink: false,
                        submenu: []
                    },
                    {
                        path: '/pages/bloqueogeneral',
                        title: 'Bloqueo dias General',
                        icon: '',
                        class: '',
                        label: '',
                        labelClass: '',
                        extralink: false,
                        submenu: []
                    }
                ]                   // submenu items if available
        }

    );
}

function incorporaMenuReservas(){
    menu.push(
        {
        path: '/pages/reservas',        //3
        title: 'Reservas',             // menu title
        icon: 'mdi mdi-keyboard',      // menu icon
        class: '',                    // additional classes
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []                   // submenu items if available
        }
    );
}

function incorporaMenuPacientes(){
    menu.push(
        {
        path: '/pages/pacientes',       //4
        title: 'Pacientes',             // menu title
        icon: 'mdi mdi-human-child',      // menu icon
        class: '',                    // additional classes
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []                   // submenu items if available
        }
    );
}

function incorporaMenuPesquisa(){
    menu.push(
        {
        path: '',                       //6
        title: 'Convocatoria',                                                  // menu title
        icon: 'mdi mdi-google-circles-extended',                                                // menu icon
        class: 'has-arrow',                                                   // only if driodown menu
        label: '2',                                                           // label name
        labelClass: 'label label-rouded label-themecolor pull-right',         // if label available
        extralink: false,
        submenu: [                                                        // submenus like single menu config
                {
                    path: '/pages/postulacion',
                    title: 'Pesquisa',
                    icon: '',
                    class: '',
                    label: '',
                    labelClass: '',
                    extralink: false,
                    submenu: []
                }
                // ,
                // {
                //     path: '/pages/admision',
                //     title: 'Admisión',
                //     icon: '',
                //     class: '',
                //     label: '',
                //     labelClass: '',
                //     extralink: false,
                //     submenu: []
                // }
            ]
        }
    );
}


function incorporaMenuMantenimiento(){

    menu.push(

    {
        path: '',     //7
        title: 'Datos',           // name of the label
        icon: '',
        class: 'nav-small-cap',      // this class is necessary
        label: '',
        labelClass: '',
        extralink: true,
        submenu: []
    },

    {
        path: '',   //8
        title: 'Configuración',                                                  // menu title
        icon: 'mdi mdi-settings',                                                // menu icon
        class: 'has-arrow',                                                   // only if driodown menu
        label: '5',                                                           // label name
        labelClass: 'label label-rouded label-themecolor pull-right',         // if label available
        extralink: false,
        submenu: [                                                        // submenus like single menu config
            // {
            //     path: '/pages/crearpacientes',
            //     title: 'Pacientes',
            //     icon: '',
            //     class: '',
            //     label: '',
            //     labelClass: '',
            //     extralink: false,
            //     submenu: []
            // },
            // {
            //     path: '/pages/crearprofesionales',
            //     title: 'Profesionales',
            //     icon: '',
            //     class: '',
            //     label: '',
            //     labelClass: '',
            //     extralink: false,
            //     submenu: []
            // },
            {
                path: '/pages/crearusuarios',
                title: 'Usuarios',
                icon: '',
                class: '',
                label: '',
                labelClass: '',
                extralink: false,
                submenu: []
            }
            // ,
            // {
            //     path: '/pages/crearprofesion',
            //     title: 'Profesión',
            //     icon: '',
            //     class: '',
            //     label: '',
            //     labelClass: '',
            //     extralink: false,
            //     submenu: []
            // },
            // {
            //     path: '/pages/crearestablecimiento',
            //     title: 'Establecimiento',
            //     icon: '',
            //     class: '',
            //     label: '',
            //     labelClass: '',
            //     extralink: false,
            //     submenu: []
            // }
        ]
    }
    );

}


module.exports = {
    obtenerMenu
};