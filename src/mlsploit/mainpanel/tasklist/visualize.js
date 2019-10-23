import { getResourceByURL, getResourcesByURLs } from  '../../../state.js'


const gatherAllData = runURL => {
  return new Promise((resolve, reject) => {
    const data = {};

    getResourceByURL(runURL).then(run => {
      let inputFilesPromise = getResourcesByURLs(run.files);
      let jobsPromise = getResourcesByURLs(run.jobs);

      Promise.all([inputFilesPromise, jobsPromise]).then(resolvedPromises => {
        let inputFiles = resolvedPromises[0];
        let jobs = resolvedPromises[1];

        let outputFilePromises = jobs.map(
          j => getResourcesByURLs(j.output_files)
        );

        Promise.all(outputFilePromises).then(outputFiles => {
          data.jobs = jobs;
          data.inputFiles = inputFiles;
          data.outputFiles = outputFiles;

          resolve(data);
        });
      });
    });
  });
};


export const getVisualizationItems = (runURL, numTasks) => {
  const visualizationItems = Array(numTasks).fill({show: false});

  if (runURL === undefined)
    return Promise.resolve(visualizationItems);

  return new Promise((resolve, reject) => {
    gatherAllData(runURL).then(data => {
      let jobs = data.jobs;
      let inputFiles = data.inputFiles;
      let outputFiles = data.outputFiles;

      let inputFileCandidate = inputFiles[0];

      jobs.forEach((job, i) => {
        if (i == 0
            && inputFileCandidate
            && inputFileCandidate.name.endsWith('.jpg')) {
          visualizationItems[i].item = {
            url: inputFileCandidate.blob_url
          };
          visualizationItems[i].renderAs = 'image';
          visualizationItems[i].type = 'INPUT';
          visualizationItems[i].show = true;
        } else {
          let outputFilesForJob = outputFiles[i];
          let outputFileCandidate = outputFilesForJob[0];
          let outputFileTags = outputFileCandidate
            ? JSON.parse(outputFileCandidate.tags)
            : {}

            if (outputFileTags['mlsploit-visualize'] == 'image') {
              visualizationItems[i].item = {
                url: outputFileCandidate.blob_url,
                label: outputFileTags['label']
              };
              visualizationItems[i].renderAs = 'image';
              visualizationItems[i].type = 'OUTPUT';
              visualizationItems[i].show = true;
            }
        }
      });

      resolve(visualizationItems);
    });
  });
};