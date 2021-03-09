/*
Server-Util Version 0.6
*/
import http from "http";

// type RESTcallbackObject = {
//   FALLBACK:
// }
/*
Example:

const cb = {
  GET: handleGETfunction,
  POST: handlePOSTfunction,
  FALLBACK: handleFALLBACKfunction,
};
# FALLBACK will called if the requested Methode is not defined in your cb

startRESTapiServer(portnumber, cb);



*/

export function startRESTapiServer(port: number, callbackObject: any) {
  if (!callbackObject) {
    console.error("ERROR: No Callback Object.");
    return;
  }
  if (!callbackObject["FALLBACK"] || !callbackObject["GET"]) {
    console.error("ERROR: Your callbackObject must have at least a FALLBACK and a GET function.");
    return;
  }

  const server = http.createServer((req, res) => {
    const returnObject = createRESTobjectFromUrlNEW(req);

    const getResponse = Object.keys(callbackObject).includes(req.method)
      ? callbackObject[req.method](returnObject)
      : callbackObject["FALLBACK"](returnObject);

    // if typeof getResponse.header === 'string' ?

    const header =
      typeof getResponse.header === "string"
        ? buildHeaderObjectFromString(getResponse.header)
        : getResponse.header;

    res.statusCode = getResponse.status;
    res.setHeader(header.name, header.value);
    res.end(getResponse.payload);
  });

  server.listen(port, () => {
    console.log(`Server running at port ${port}`);
  });
}

// --------------------------
// Responsehelper

export async function respondErrorJson(responseobject: any, msg: any, status: number = 400) {
  msg = {
    status: status,
    error: msg,
  };
  await respondNiceJsonRequest(responseobject, msg, status);
}

export function respondNiceJsonRequest(
  responseobject: any,
  JSONpayload: any,
  status: any = 200,
  header: any = "Content-Type: application/json"
) {
  header = typeof header === "string" ? buildHeaderObjectFromString(header) : header;
  responseobject.statusCode = status;
  responseobject.setHeader(header.name, header.value);
  responseobject.end(JSON.stringify(JSONpayload));
}

export function wrapResponseData(data: any, status: number = 200) {
  return {
    status: status,
    data: data,
  };
}

function buildHeaderObjectFromString(stringHeader: string) {
  return stringHeader.match(/(?<name>[\w-]+)\s*:\s*(?<value>[\w\/]+)/).groups;
  // const xx = stringHeader.match(/(?<name>[\w-]+)\s*:\s*(?<value>[\w\/]+)/);
  // console.log(xx.groups);
  // const [name, value] = stringHeader.split(":").map((e) => e.trim());
  // return {name: name, value: value};
}

function deleteFiltersFromLastElement(collection: any) {
  if (collection[collection.length - 1].includes("?")) {
    collection[collection.length - 1] = collection[collection.length - 1].replace(/\?.*/, "");
  }
  return collection;
}

function getUrlParameter(url: string) {
  const [leftside, rightside] = url.split("?");
  return !rightside
    ? {}
    : JSON.parse(
        `{"${decodeURI(rightside).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`
      );
}

// --------------------------
// REST helper

export function createRESTobjectFromUrl(req: any) {
  // REST naming: https://restfulapi.net/resource-naming/
  // memo: collection,store,controller
  // console.log(req.status);
  //
  // Naming EXAMPLE:
  // http://api.example.com/device-management/managed-devices?region=USA&brand=XYZ
  // http://api.example.com/COLLECTION/(DOCUMENT|STORE|CONTROLLER)?FILTER

  const urlSements = req.url.split("/").filter((cleanEmpty: string) => cleanEmpty !== "");
  const filters = getUrlParameter(req.url);
  const collection = deleteFiltersFromLastElement(urlSements.slice(1, urlSements.length));

  return {
    url: req.url,
    method: req.method,
    segments: urlSements,
    rest: {
      document: urlSements[0],
      collection: collection,
      filters: filters,
    },
  };
}

export function createRESTobjectFromUrlNEW(req: any) {
  // REST naming: https://restfulapi.net/resource-naming/
  // memo: collection,store,controller
  // console.log(req.status);
  //
  // Naming EXAMPLE:
  // http://api.example.com/device-management/managed-devices?region=USA&brand=XYZ
  // http://api.example.com/COLLECTION/(DOCUMENT|STORE|CONTROLLER)?FILTER

  const urlSements = req.url.split("/").filter((cleanEmpty: string) => cleanEmpty !== "");
  const filters = getUrlParameter(req.url);
  const collection = deleteFiltersFromLastElement(urlSements.slice(1, urlSements.length));

  return {
    url: req.url,
    method: req.method,
    segments: urlSements,
    rest: {
      basename: urlSements[0],
      // basename: urlSements[0],
      collection: collection,
      filters: filters,
    },
  };
}

// res.statusCode = 200;
// res.setHeader("Content-Type", "application/json");
// res.end(JSON.stringify(content));
