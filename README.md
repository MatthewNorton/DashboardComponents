# A suite of components for acclerated UI creation
There are components for navigation & sub menus and a simple page footer

#   NavigationMenu
This is a top of page nav bar 80px high which allows the specification of an icon (top left), a title and sub title, a user avatar + name and role text and a configurable set of menu items.

![alt text](https://files-manywho-com.s3.amazonaws.com/bf9c8481-0fbe-4240-941d-8d928744ba4d/NavigationMenu.png)

The user element shows an icon for the user and their name, the user name is gotten from flow and that, if specified, maps to a png file in assets with the same file name e.g. username=fred.bloggs graphic should be fred.bloggs.png

The menu items are configured using a list in flow and can be displayed as icons with tool tips or text.  They support child items as a drop down.  

Each one can be a NAVIGATE, FUNCTION, OPEN, OUTCOME or MENU

```
NAVIGATE will redirect the current browser to another Uri page named in value.
OPEN will open the Uri in a new tab named in value
OUTCOME will trigger the specified outcome named in value
FUNCTION will execute the JS function named in value
MENU allows specifying the name of a list (int the value field) which contains other MenuItems to form a child dropdown menu.
```

The exact function of each menu item is defined in the pre-requisite MenuItem type: -

```
MenuItem{
    label       string  the display text for the item, the caption
    value       string  the value used when this menu item is triggered e.g. the name of the outcome to trigger 
                        or the Uri to open in a new tab etc.
    icon        string  the bootstrap glyphicon to display, just the short name without the "glyphicon-" part e.g. envelope or wrench.  
                        if not specifed then it shows the label, this controls if it's an icon or text menu item
    type        string  the action type NAVIGATE, OPEN, OUTCOME, MENU, FUNCTION
    name        string  the internal name of the menu, not really used
    order       number  the display order or position from 1-99 allowing you to define the order the menu items are shown
    subItems    list    a list of child MenuItem objects to use for nested dropdown.
}
```

So create the MenuItem type and then a list of them and set the values - the type definition is shown below to be created via the API.

Drop a component on your page, change its componentType to NavigationMenu, set its DataSource to your MenuItem list and add these attributes: -

```
logo                    string      the full url to the graphic you want for the top left icon, can be multiple with comma or semicolon delimiter.  
                                    you could store the logo graphic in assets for ease.
title                   string      the title bar title label
sub-title               string      some smaller text to show under the title label
hide-user-anonymous     boolean     true to completely hide the user details if in anonymous mode i.e. flow doesn't use authentication, false
hide-user               boolean     true to completely hide the user details.
```

If flow is using authenication then you should add a .jpg file for each user named with their email e.g. fred_bloggs@somewhere.com.jpg.  This image will be used for the user's avatar

#   MenuBar
Adds a colored sub menu.

This takes a list of menu items in it's datasource like the NavigationMenu.

There is an extra type defined called LABEL which will just show the text specified.

#   Footer
The Footer component shows a simple bar at the bottom of the page in which you can set a single string of text to be shown centered in the page.

![alt text](https://files-manywho-com.s3.amazonaws.com/bf9c8481-0fbe-4240-941d-8d928744ba4d/Footer.png)

Drop a component on your page, change its componentType to Footer, set its DataSource to your MenuItem list and add these attributes: -

```
title                   string      the text to be displayed in the footer.
```


# Menu Item

in the tenant's API tool open the type endpoint /api/draw/1/element/type and paste thie following JSON then POST it.


'''
{
        "developerName": "MenuItem",
        "developerSummary": "A Menu Item",
        "elementType": "TYPE",
        "properties": [
            {
                "contentFormat": "",
                "contentType": "ContentString",
                "developerName": "label",
                "typeElementDeveloperName": null,
                "typeElementId": null
            },
            {
                "contentFormat": "",
                "contentType": "ContentString",
                "developerName": "value",
                "typeElementDeveloperName": null,
                "typeElementId": null
            },
            {
                "contentFormat": "",
                "contentType": "ContentString",
                "developerName": "icon",
                "typeElementDeveloperName": null,
                "typeElementId": null
            },
            {
                "contentFormat": "",
                "contentType": "ContentString",
                "developerName": "type",
                "typeElementDeveloperName": null,
                "typeElementId": null
            },
            {
                "contentFormat": "",
                "contentType": "ContentString",
                "developerName": "name",
                "typeElementDeveloperName": null,
                "typeElementId": null
            },
            {
                "contentFormat": "",
                "contentType": "ContentNumber",
                "developerName": "order",
                "typeElementDeveloperName": null,
                "typeElementId": null
            }
        ]
    }
'''