class CustomModel {
  constructor(data) {
    this.id = data.id;
    this.url = data.url;
    this.name = data.name;
    this.owner_url = data.owner;
  }
}

export class Function extends CustomModel {
  constructor(data) {
    super(data);
    this.module_url = data.module;
    this.options = JSON.parse(data.options);
  }
}

export class Module extends CustomModel {
  constructor(data) {
    super(data);
    this.repo = data.repo;
    this.functions = data.functions.map(f => {
      return new Function({...f, module: this.url});
    });
    this.input_schema = data.input_schema;
    this.output_schema = data.output_schema;
  }
}

export class User extends CustomModel {
  constructor(data) {
    super(data);
    this.username = data.username;
    this.file_urls = data.files;
    this.pipeline_urls = data.pipelines;
  }
}

export class File extends CustomModel {
  constructor(data) {
    super(data);
    this.blob_url = data.blob_url;
    this.kind = data.kind;
    this.tags = JSON.parse(data.tags);
    this.parent_file_url = data.parent_file;
    this.modified_version_urls = data.modified_versions;
    this.date_uploaded = new Date(data.date_uploaded);
  }
}

export class Task extends CustomModel {
  constructor(data) {
    super(data);
    this.pipeline_url = data.pipeline;
    this.function_url = data.function;
    this.arguments = JSON.parse(data.arguments);
    this.order = data.order;
    this.date_created = (data.date_created 
      ? new Date(data.date_created) 
      : undefined
    );
  }
}

export class Pipeline extends CustomModel {
  constructor(data) {
    super(data);
    this.tasks = data.tasks.map(t => {
      return new Task({
        ...t, 
        pipeline: this.url, 
        owner: this.owner_url
      });
    });
    this.runs = data.runs;
    this.enabled = data.enabled;
    this.date_created = new Date(data.date_created);
  }
}
