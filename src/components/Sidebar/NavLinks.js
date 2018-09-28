// sidebar nav links
export default {
      category1: [
            {
                  "menu_title": "Mis Contenidos",
                  "menu_icon": "ti-folder",
                  "open": false,
                  "child_routes": [
                        {
                              "path": "/app/dashboard",
                              "menu_title": "Toliv"
                        },
                        {
                              "path": "/app/dashboard",
                              "menu_title": "Aeurolav"
                        },
                        {
                              "path": "/app/dashboard",
                              "menu_title": "Bunkey"
                        },
                        {
                              "path": "/app/dashboard",
                              "menu_title": "Favoritos"
                        }
                  ]
            },
            {
                  "menu_title": "Compartidos contigo",
                  "menu_icon": "ti-share-alt",
                  "open": false,
                  "child_routes": [
                        {
                              "path": "/app/dashboard",
                              "menu_title": "Toliv"
                        }
                  ]
            },
            {
                  "menu_title": "Recientes",
                  "menu_icon": "ti-timer",
                  "open": false,
                  "child_routes": [
                       
                        {
                              "path": "/app/dashboard",
                              "menu_title": "Toliv"
                        }
                  ]
            },
            {
                  "menu_title": "Usuarios",
                  "menu_icon": "ti-user",
                  "path": "/app/usuarios",
                  "child_routes": null
            },
            {
                  "menu_title": "Configuracion",
                  "menu_icon": "ti-settings",
                  "path": "/app/configuracion",
                  "child_routes": null
            }
            
            
      ]
}
