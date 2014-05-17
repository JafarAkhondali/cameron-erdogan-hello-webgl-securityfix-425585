// potentially confusing convention: index is usually going to come in as 2*i, 
// as in, the actual index in the Force array, not the particle number 
// (ie information for particle number 0 in the position array, x, 
// occurs at indicies 0 and 1)
// takeaway: assume this function is going to recieve the exact place
// in F where you want to modify the force
function add2SegIntoF(F, in_seg, index)
{
	var F_seg = numeric.getBlock(F, [index, 0], [index + 1, 0]);
	seg = numeric.add(in_seg, F_seg);
	copySegmentIntoVector(F, seg, index);
}