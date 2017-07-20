function [T] = Q3_T (params, out, t)
  fn = @(t,y)basicLifeCycle(t,y,params);
%fn = @(t,y)basicLifeCycleSeasonality(t,y,params);
%fn = @(t,y)lifeCycleWithBuffelgrass(t,y,params);
[time,output] = ode23s(fn,t , out);
T = output(end,3);
end