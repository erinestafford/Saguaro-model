function [T] = Q3_T (params, out, t)
fn = @(t,y)basicLifeCycle(t,y,params);
[time,output] = ode23s(fn,t , out);
T = output(end,2);
end