
# Campfire API

**Base URL:** Staging: https://staging-campfire-api.azurewebsites.net/api

## Campfires

### **Get Campfires**

[GET] https://staging-campfire-api.azurewebsites.net/api/campfires

#### *Response*

**200: OK**

    [
        {
            _id: string,
            topic: string,
            altTopic: string,
            duration: string,
            description: string,
            creator: {
                uid: string,
                profileUrl: string,
                name: string,
            },
            hidden: boolean,
            scheduleToStart: Date,
            openTo: string,
            members: [Object]
            createdAt: Date,
            updatedAt: Date,
        },
        { ... },
        { ... },
    ]

### **Get Owned Campfires**

[GET] https://staging-campfire-api.azurewebsites.net/api/campfires/owned?cid=:cid

#### *Response*

**200: OK**

    [
        {
            _id: string,
            topic: string,
            altTopic: string,
            duration: string,
            description: string,
            creator: {
                uid: string,
                profileUrl: string,
                name: string,
            },
            hidden: boolean,
            scheduleToStart: Date,
            openTo: string,
            createdAt: Date,
            updatedAt: Date,
        },
        { ... },
        { ... },
    ]

### **Filter Owned Campfires By Topic**

[GET] https://staging-campfire-api.azurewebsites.net/api/campfires/owned?cid=:cid&tpc=:topic

#### *Response*

**200: OK**

    [
        {
            _id: string,
            topic: string,
            altTopic: string,
            duration: string,
            description: string,
            creator: {
                uid: string,
                profileUrl: string,
                name: string,
            },
            hidden: boolean,
            scheduleToStart: Date,
            openTo: string,
            createdAt: Date,
            updatedAt: Date,
        },
        { ... },
        { ... },
    ]

### **Get Public Campfires**

[GET] https://staging-campfire-api.azurewebsites.net/api/campfires/public?cid=:cid

#### *Response*

**200: OK**

    [
        {
            _id: string,
            topic: string,
            altTopic: string,
            duration: string,
            description: string,
            creator: {
                uid: string,
                profileUrl: string,
                name: string,
            },
            hidden: boolean,
            scheduleToStart: Date,
            openTo: string,
            createdAt: Date,
            updatedAt: Date,
        },
        { ... },
        { ... },
    ]

### **Filter Public Campfires By Topic**

[GET] https://staging-campfire-api.azurewebsites.net/api/campfires/public?cid=:cid&tpc=:topic

#### *Response*

**200: OK**

    [
        {
            _id: string,
            topic: string,
            altTopic: string,
            duration: string,
            description: string,
            creator: {
                uid: string,
                profileUrl: string,
                name: string,
            },
            hidden: boolean,
            scheduleToStart: Date,
            openTo: string,
            createdAt: Date,
            updatedAt: Date,
        },
        { ... },
        { ... },
    ]

### **Get Private Campfires**

[GET] https://staging-campfire-api.azurewebsites.net/api/campfires/private?cid=:cid

#### *Response*

**200: OK**

    [
        {
            _id: string,
            topic: string,
            altTopic: string,
            duration: string,
            description: string,
            creator: {
                uid: string,
                profileUrl: string,
                name: string,
            },
            hidden: boolean,
            scheduleToStart: Date,
            openTo: string,
            createdAt: Date,
            updatedAt: Date,
        },
        { ... },
        { ... },
    ]

### **Filter Private Campfires By Topic**

[GET] https://staging-campfire-api.azurewebsites.net/api/campfires/private?cid=:cid&tpc=:topic

#### *Response*

**200: OK**

    [
        {
            _id: string,
            topic: string,
            altTopic: string,
            duration: string,
            description: string,
            creator: {
                uid: string,
                profileUrl: string,
                name: string,
            },
            hidden: boolean,
            scheduleToStart: Date,
            openTo: string,
            createdAt: Date,
            updatedAt: Date,
        },
        { ... },
        { ... },
    ]

### **Get Campfire**

[GET] https://staging-campfire-api.azurewebsites.net/api/campfires/:id

#### *Response*

**200: OK**

    {   
        _id: string,
        topic: string,
        altTopic: string,
        duration: string,
        description: string,
        creator: {
            uid: string,
            profileUrl: string,
            name: string,
        },
        hidden: boolean,
        scheduleToStart: Date,
        openTo: string,
        createdAt: Date,
        updatedAt: Date,
    }

### **Get Campfire Members**

[GET] https://staging-campfire-api.azurewebsites.net/api/campfires/:id/member

#### *Response*

**200: OK**

    {
        _id: string,
        members: [
            {
                uid: string,
                profileUrl: string,
                name: string,
                status: string,
                role: string,
                campfire: string,
            },
            { ... },
            { ... },
        ],
    }

### **Add Campfire**

[POST] https://staging-campfire-api.azurewebsites.net/api/campfires

#### *Request*

**Request Headers**

| Name | Value |
| --- | --- |
| Content-Type | application/json |

**Request Body**

Object

| Name | Type | Required |
| --- | --- | --- |
| topic | string | true |
| altTopic | string | true |
| duration | string | optional |
| description | string | true |
| creator | Object{ **uid**: string, **profileUrl**: string, **name**: string } | true |
| hidden | boolean | optional |
| scheduleToStart | Date | optional |
| openTo | string | Everyone = default, Invite Only |

#### *Response*

**201: Created**

    {   
        topic: string,
        altTopic: string,
        duration: string,
        description: string,
        creator: {
            uid: string,
            profileUrl: string,
            name: string,
        },
        hidden: boolean,
        scheduleToStart: Date,
        openTo: string,
        _id: string,
        members: [],
        createdAt: Date,
        updatedAt: Date,
    }

### **Add Campfire with Members**

[POST] https://staging-campfire-api.azurewebsites.net/api/campfires

#### *Request*

**Request Headers**

| Name | Value |
| --- | --- |
| Content-Type | application/json |

**Request Body**

Object

| Name | Type | Required |
| --- | --- | --- |
| topic | string | true |
| altTopic | string | true |
| duration | string | optional |
| description | string | true |
| creator | Object{ **uid**: string, **profileUrl**: string, **name**: string } | true |
| members | Array{ **profileUrl**: string, **name**: string, **uid**: string } | true |
| hidden | boolean | optional |
| scheduleToStart | Date | optional |
| openTo | string | Everyone = default, Invite Only |

#### *Response*

**201: Created**

    {   
        topic: string,
        altTopic: string,
        duration: string,
        description: string,
        creator: {
            uid: string,
            profileUrl: string,
            name: string,
        },
        hidden: boolean,
        scheduleToStart: Date,
        openTo: string,
        _id: string,
        members: [
            {
                uid: string,
                profileUrl: string,
                name: string,
                status: string,
                role: string,
                campfire: string,
            },
            { ... },
            { ... },
        ],
        createdAt: Date,
        updatedAt: Date,
    }

### **Update Campfire**

[PATCH] https://staging-campfire-api.azurewebsites.net/api/campfires/:id

#### *Request*

**Request Headers**

| Name | Value |
| --- | --- |
| Content-Type | application/json |

**Request Body**

Object

| Name | Type | Required |
| --- | --- | --- |
| topic | string | true |
| altTopic | string | true |
| duration | string | optional |
| description | string | true |
| hidden | boolean | optional |
| scheduleToStart | Date | optional |
| openTo | string | Everyone = default, Invite Only |

#### *Response*

**200: OK**

    {   
        _id: string,
        topic: string,
        altTopic: string,
        duration: string,
        description: string,
        creator: {
            uid: string,
            profileUrl: string,
            name: string,
        },
        hidden: boolean,
        scheduleToStart: Date,
        openTo: string,
        createdAt: Date,
        updatedAt: Date,
    }

### **Delete Campfire**

[DELETE] https://staging-campfire-api.azurewebsites.net/api/campfires/:id

#### *Response*

**200: OK**

    {   
        message: "Campfire deleted successfully!"
    }

## Members

### **Get member**

[POST] https://staging-campfire-api.azurewebsites.net/api/member/get

#### *Request*

**Request Headers**

| Name | Value |
| --- | --- |
| Content-Type | application/json |

**Request Body**

Object

| Name | Description | Type | Required |
| --- | --- | --- | --- |
| id | Campfire id *(Note: Campfire must exist)* | string | true |
| uid | user id |  string | true |

#### *Response*

**200: OK**

    {
        uid: string,
        profileUrl: string,
        name: string,
        status: string,
        role: string,
        campfire: string,
    }

### **Add member**

[PATCH] https://staging-campfire-api.azurewebsites.net/api/member/push

#### *Request*

**Request Headers**

| Name | Value |
| --- | --- |
| Content-Type | application/json |

**Request Body**

Object

| Name | Description | Type | Required |
| --- | --- | --- | --- |
| member | member details | Object{ **profileUrl**: string, **name**: string, **campfire**: string, **uid**: string } | true |
| id | Campfire id *(Note: Campfire must exist)* | string | true |

#### *Response*

**201: Created**

    {
        uid: string,
        profileUrl: string,
        name: string,
        status: string,
        role: string,
        campfire: string,
    }

### **Update member status**

[PATCH] https://staging-campfire-api.azurewebsites.net/api/member/set/status

#### *Request*

**Request Headers**

| Name | Value |
| --- | --- |
| Content-Type | application/json |

**Request Body**

Object

| Name | Description | Type | Required |
| --- | --- | --- | --- |
| status | member status | pending, invited | true |
| uid | User id | string | true |
| id | Campfire id *(Note: Campfire must exist)* | string | true |

#### *Response*

**200: OK**

    {
        uid: string
    }

### **Update member role**

[PATCH] https://staging-campfire-api.azurewebsites.net/api/member/set/role

#### *Request*

**Request Headers**

| Name | Value |
| --- | --- |
| Content-Type | application/json |

**Request Body**

Object

| Name | Description | Type | Required |
| --- | --- | --- | --- |
| role | member role | speaker, moderator, audience | true |
| uid | User id | string | true |
| id | Campfire id *(Note: Campfire must exist)* | string | true |

#### *Response*

**200: OK**

    {
        uid: string
    }

### **Delete campfire member**

[PATCH] https://staging-campfire-api.azurewebsites.net/api/member/pull

#### *Request*

**Request Headers**

| Name | Value |
| --- | --- |
| Content-Type | application/json |

**Request Body**

Object

| Name | Description | Type | Required |
| --- | --- | --- | --- |
| uid | User id | string | true |
| id | Campfire id *(Note: Campfire must exist)* | string | true |

#### *Response*

**200: OK**

    {
        uid: string,
        message: 'Member removed successfully!'
    }
