let tasks = [
    {
        "name": "say_hello",
        "options": [
            {
                "name": "age", "type": "int",
                "required": true
            },
            {
                "name": "gender", "type": "enum",
                "values": ["F", "M", "Other"],
                "required": true
            },
            {
                "name": "wears_glasses", "type": "bool",
                "required": false
            }
        ],
        "extensions": [
            {"extension": "txt"}
        ]
    },
    {
      "name": "say_hello",
      "options": [
          {
              "name": "age", "type": "int",
              "required": true
          },
          {
              "name": "gender", "type": "enum",
              "values": ["F", "M", "Other"],
              "required": true
          },
          {
              "name": "wears_glasses", "type": "bool",
              "required": false
          }
      ],
      "extensions": [
          {"extension": "txt"}
      ]
  },
  {
      "name": "say_hello",
      "options": [
          {
              "name": "age", "type": "int",
              "required": true
          },
          {
              "name": "gender", "type": "enum",
              "values": ["F", "M", "Other"],
              "required": true
          },
          {
              "name": "wears_glasses", "type": "bool",
              "required": false
          }
      ],
      "extensions": [
          {"extension": "txt"}
      ]
  },
  {
      "name": "say_hello",
      "options": [
          {
              "name": "age", "type": "int",
              "required": true
          },
          {
              "name": "gender", "type": "enum",
              "values": ["F", "M", "Other"],
              "required": true
          },
          {
              "name": "wears_glasses", "type": "bool",
              "required": false
          }
      ],
      "extensions": [
          {"extension": "txt"}
      ]
  },
  {
      "name": "say_hello",
      "options": [
          {
              "name": "age", "type": "int",
              "required": true
          },
          {
              "name": "gender", "type": "enum",
              "values": ["F", "M", "Other"],
              "required": true
          },
          {
              "name": "wears_glasses", "type": "bool",
              "required": false
          }
      ],
      "extensions": [
          {"extension": "txt"}
      ]
  },
    {
        "name": "add_number",
        "options": [
            {"name": "number", "type": "int", "required": true}
        ],
        "required_input_tags": [
            "ftype"
        ],
        "extensions": [
            {
                "tags": {"ftype": "input"},
                "extension": "txt"
            }
        ]
    }
  ];
  
  export default tasks;
  