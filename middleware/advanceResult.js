const advanceResult = (model, populate) => async (req, res, next) => {
  let reqQuery = { ...req.query };
  let query;

  // handle special key words
  let removedFields = ["select", "sort", "limit", "page"];
  removedFields.forEach((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(lt|lte|gt|gte|in)\b/g,
    (match) => `$${match}`
  );
  query = model.find(JSON.parse(queryStr));

  // handle select
  if (req.query.select) {
    let fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }
  // handle sort
  if (req.query.sort) {
    let sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // handle pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const startAt = (page - 1) * limit;
  const endsAt = page * limit;

  const total = await model.countDocuments();

  query = query.skip(startAt).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }
  const result = await query;

  const pagination = {};
  if (startAt > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }
  if (endsAt < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (!result) {
    new ErrorResponse(`resource not found `, 404);
  }

  res.advanceResult = {
    count: result.length,
    data: result,
    pagination,
  };
  next();
};

module.exports = advanceResult;
