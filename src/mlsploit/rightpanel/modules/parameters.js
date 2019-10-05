let parameters = {
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
      }

export default parameters
